import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { interval, Observable, Subscription } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import { AlertService } from '../world/alert/alert.service';
import { WebStorageService } from '../world/web-storage/webstorage.service';
import { World } from '../world/world';
import { Alderman } from './alderman';
import { AldermanService } from './alderman.service';

@Component({
    selector: 'app-alderman',
    templateUrl: './alderman.component.html',
    styleUrls: [ './alderman.component.scss' ]
})
export class AldermanComponent implements OnInit {
    
    idVer: number;
    idJogo;

    infoVer: Alderman;
    infoMundo$: Observable<World>;

    liberaBotao: boolean = false;

    counter: Observable<number> = interval(10 * 1000);
    subscription: Subscription;
    
    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private verService: AldermanService,
        private alertService: AlertService,
        private webStorageService: WebStorageService
    ){ }

    ngOnInit(){
        this.idVer = this.activatedRoute.snapshot.params.idVer;
        this.idJogo = this.activatedRoute.snapshot.params.idJogo;

        this.verService.getInfo(this.idJogo, this.idVer).subscribe(
            (data: Alderman) => {
                this.infoVer = data;
                this.infoMundo$ = this.verService.getInfoMundo(this.idJogo);
                this.verificaFimEtapa();
            },
            err => console.log(err)
        );
    }

    verificaFimEtapa(){
        this.subscription = this.counter
            .pipe(
                flatMap(
                    () => this.verService.verificaFimEtapa(this.idJogo, 2)
                )
            )
            .subscribe(
                (data: number) => {
                    console.log(data);
                    if(data > 2) this.liberaBotao = true;
                    else if(data == 0){
                        this.subscription.unsubscribe();
                        this.finalizaJogada(true);
                    }
                },
                err => console.log(err)
            );
    }

    finalizaJogada(finishedByMaster: boolean = false){
        this.verService.finalizaJogada(this.idJogo, this.idVer)
            .subscribe(
                () => {
                    this.subscription.unsubscribe();
                    if(finishedByMaster) this.alertService.warning('Jogada finalizada pelo Mestre.', true);
                    else this.alertService.success('Jogada finalizada.', true);
                    this.webStorageService.removeData(['suggestion' + this.idVer + 'idSugestao']);
                    this.router.navigate([this.idJogo, 'waitingPage', this.idVer]);
                },
                err => {
                    console.log(err);
                    this.alertService.danger('Algo deu errado. Por favor, tente novamente.');
                }
            );
    }


}