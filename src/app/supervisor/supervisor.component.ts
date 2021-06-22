import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { interval, Observable, Subscription } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import { WebStorageService } from '../world/web-storage/webstorage.service';
import { AlertService } from '../world/alert/alert.service';
import { PersonSimplified } from '../world/models/person.simplified';
import { World } from '../world/world';
import { FineService } from './fine/fine.service';
import { GreenSealService } from './green-seal/green-seal.service';
import { Fine, GreenSeal, PostForm } from './postForm';
import { Supervisor } from './supervisor';
import { SupervisorService } from './supervisor.service';
import { ChatInfo } from '../world/chat/chat-info';
import { WebSocketService } from '../world/web-socket/web-socket.service';

@Component({
    selector: 'app-supervisor',
    templateUrl: './supervisor.component.html',
    styleUrls: [ './supervisor.component.scss' ]
})
export class SupervisorComponent implements OnInit {
    
    idFis: number;
    idJogo: number;
    
    pessoas: PersonSimplified[];

    infoFis: Supervisor;
    nomeCurto: string;
    infoMundo$: Observable<World>;

    nomeFines: string[] = ['Baixa', 'Média', 'Alta'];
    fines: Fine[] = [];
    greenSeals: GreenSeal[] = [];

    liberaBotao: boolean = false;

    counter: Observable<number> = interval(10 * 1000);
    subscription: Subscription;

    chatInfo: ChatInfo;

    constructor(
        private activatedRoute: ActivatedRoute,
        private fisService: SupervisorService,
        private fineService: FineService,
        private greenSealService: GreenSealService,
        private webStorageService: WebStorageService,
        private alertService: AlertService,
        private router: Router,
        private wsService: WebSocketService
    ){ }

    ngOnInit(){
        this.idFis = this.activatedRoute.snapshot.params.idFis;
        this.idJogo = this.activatedRoute.snapshot.params.idJogo;
        this.fisService.getInfo(this.idJogo, this.idFis).subscribe(
            (data: Supervisor) => {
                if(data != null){
                    this.infoMundo$ = this.fisService.getInfoMundo(this.idJogo);
                    this.nomeCurto = (data.cidade == 'Atlantis') ? 'FisfAT' : 'FisCD';

                    this.wsService.changeConnection((this.nomeCurto + this.idJogo), this.nomeCurto, (this.nomeCurto + this.idFis), this.fisService);

                    this.chatInfo = {
                        nomePessoa: this.nomeCurto,
                        idPessoa: data.id,
                        idJogo: this.idJogo,
                        role: 'prefeito',
                        cidade: data.cidade
                    } as ChatInfo;
            
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
                                console.log(greenSeal);
                                this.greenSeals.push(greenSeal);
                                this.webStorageService.setData('fis'+ this.idFis + 'GreenSeals', this.greenSeals);
                            }
                        },
                        err => console.log(err)
                    );
            
                    this.fineService.getInfoPessoas(this.idJogo, data.cidade).subscribe(
                        (data: PersonSimplified[]) => {
                            console.log(data);
                            this.pessoas = data;
                        },
                        err => console.log(err)
                    );

                    this.infoFis = data;
                }
                else this.alertService.warning('Algo deu errado ao carregar os dados, por favor, reinicie a página.');
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

    getNomePessoa(idPessoa: number){
        this.pessoas.forEach(pessoa => {
            if(pessoa.id == idPessoa) return pessoa.nome;
        });
    }

    verificaFimEtapa(){
        this.subscription = this.counter
            .pipe(
                flatMap(
                    () => this.fisService.verificaFimEtapa(this. idJogo, 2)
                )
            )
            .subscribe(
                (data: number) => {
                    console.log(data);
                    if(data == 3) this.finalizarJogada(true, true);
                    else if(data > 2) this.liberaBotao = true;
                    else if(data == 0) this.finalizarJogada(true);
                },
                err => console.log(err)
            );
    }

    finalizarJogada(finishedByMaster: boolean = false, gameover: boolean = false){
        this.fisService.finalizaJogada(
            this.idJogo,
            this.idFis,
            {
                multas: this.fines,
                selosVerde: this.greenSeals
            } as PostForm
        ).subscribe(
            () => {
                this.subscription.unsubscribe();
                this.webStorageService.removeData([
                    'fine' + this.idFis + 'pessoasMultadas',
                    'fis'+ this.idFis + 'Fines',
                    'fis'+ this.idFis + 'GreenSeals'
                ]);
                if(!gameover){
                    if(finishedByMaster) this.alertService.warning('Jogada finalizada pelo Mestre.', true);
                    else this.alertService.success('Jogada finalizada.', true);
                    this.router.navigate([this.idJogo, 'waitingPage', this.idFis]);
                }
                this.alertService.warning('O jogo terminou', true);
                this.router.navigate([this.idJogo, 'gameover']);
            },
            err => {
                console.log(err);
                this.alertService.danger('Algo deu errado. Por favor, tente novamente.');
            }
        );
    }
}