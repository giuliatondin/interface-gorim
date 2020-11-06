import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { interval, Observable, Subscription } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import { WebStorageService } from '../agriculturist/webstorage.service';
import { AlertService } from '../world/alert/alert.service';
import { PersonSimplified } from '../world/models/person.simplified';
import { World } from '../world/world';
import { FineService } from './fine/fine.service';
import { GreenSealService } from './green-seal/green-seal.service';
import { Fine, GreenSeal, PostForm } from './postForm';
import { Supervisor } from './supervisor';
import { SupervisorService } from './supervisor.service';

@Component({
    selector: 'app-supervisor',
    templateUrl: './supervisor.component.html',
    styleUrls: [ './supervisor.component.scss' ]
})
export class SupervisorComponent implements OnInit {
    
    idFis: number;
    idJogo;
    
    pessoas: PersonSimplified[];

    infoFis: Supervisor;
    infoMundo$: Observable<World>;

    fines: Fine[] = [];
    greenSeals: GreenSeal[] = [];

    liberaBotao: boolean = false;

    counter: Observable<number> = interval(10 * 1000);
    subscription: Subscription;

    constructor(
        private activatedRoute: ActivatedRoute,
        private fisService: SupervisorService,
        private fineService: FineService,
        private greenSealService: GreenSealService,
        private webStorageService: WebStorageService,
        private alertService: AlertService,
        private router: Router
    ){ }

    ngOnInit(){
        this.idFis = this.activatedRoute.snapshot.params.idFis;
        this.idJogo = this.activatedRoute.snapshot.params.idJogo;
        this.fisService.getInfo(this.idFis).subscribe(
            (data: Supervisor) => {
                this.infoFis = data;
                this.infoMundo$ = this.fisService.getInfoMundo(this.idJogo);
            },
            err => console.log(err)
        );
        
        if(this.webStorageService.hasData('fis'+ this.idFis + 'Fines'))
            this.fines = this.webStorageService.getData('fis'+ this.idFis + 'Fines') as Fine[];
        this.webStorageService.setData('fis'+ this.idFis + 'Fines', this.fines);

        this.fineService.sharedFines.subscribe(
            (fine: Fine) => {
                if(fine.idPessoa != 0){
                    this.fines.push(fine);
                    this.webStorageService.setData('fis'+ this.idFis + 'Fines', this.fines);
                }
            },
            err => console.log(err)
        );
        
        if(this.webStorageService.hasData('fis'+ this.idFis + 'GreenSeals'))
            this.greenSeals = this.webStorageService.getData('fis'+ this.idFis + 'GreenSeals') as GreenSeal[];
        this.webStorageService.setData('fis'+ this.idFis + 'GreenSeals', this.greenSeals);

        this.greenSealService.sharedGreenSeals.subscribe(
            (greenSeal: GreenSeal) => {
                if(greenSeal.idAgr != 0){
                    this.greenSeals.push(greenSeal);
                    this.webStorageService.setData('fis'+ this.idFis + 'GreenSeals', this.greenSeals);
                }
            },
            err => console.log(err)
        );

        this.fineService.getInfoPessoas()
            .subscribe(
                (data: PersonSimplified[]) => {
                    this.pessoas = data;
                },
                err => console.log(err)
            );

        this.verificaFimEtapa();
    }

    removeFine(fine: Fine){
        this.fines.splice(this.fines.indexOf(fine), 1);
        this.alertService.success("Removido.");
        this.webStorageService.setData('fis'+ this.idFis + 'GreenSeals', this.fines);
        this.fineService.nextDesmultaId(fine.idPessoa);
    }

    removeGreenSeal(greenSeal: GreenSeal){
        this.greenSeals.splice(this.greenSeals.indexOf(greenSeal), 1);
        this.alertService.success("Removido.");
        this.webStorageService.setData('fis'+ this.idFis + 'GreenSeals', this.greenSeals);
    }

    verificaFimEtapa(){
        this.subscription = this.counter
            .pipe(
                flatMap(
                    () => this.fisService.verificaFimEtapa(2)
                )
            )
            .subscribe(
                (data: number) => {
                    console.log(data);
                    if(data > 2) this.liberaBotao = true;
                    else if(data == 0){
                        this.subscription.unsubscribe();
                        this.finalizarJogada(true);
                    }
                },
                err => console.log(err)
            );
    }

    finalizarJogada(finishedByMaster: boolean = false){
        this.fisService.finalizaJogada(
            this.idFis,
            {
                multas: this.fines,
                selosVerde: this.greenSeals
            } as PostForm
            )
            .subscribe(
                () => {
                    this.subscription.unsubscribe();
                    if(finishedByMaster) this.alertService.warning('Jogada finalizada pelo Mestre.', true);
                    else this.alertService.success('Jogada finalizada.', true);
                    this.router.navigate([this.idJogo, 'waitingPage', this.idFis]);
                },
                err => {
                    console.log(err);
                    this.alertService.danger('Algo deu errado. Por favor, tente novamente.');
                }
            );
    }
}