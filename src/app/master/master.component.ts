import { Component, OnInit } from '@angular/core';
import { interval, Observable } from 'rxjs';

import { MasterService } from './master.service';
import { World } from '../world/world';
import { ActivatedRoute } from '@angular/router';
import { flatMap } from 'rxjs/operators';
import { PersonSimplified } from '../world/models/person.simplified';
import { AlertService } from '../world/alert/alert.service';

@Component({
    selector: 'app-master',
    templateUrl: './master.component.html',
    styleUrls: ['./master.component.scss']
})
export class MasterComponent implements OnInit {

    infoMundo$: Observable<World>;
    mundo: World;
    idJogo: number;

    hasUnfinishedPlayers: boolean;

    apareceBotao: boolean = false;

    // coisas do modal
    openModalBtnText="Terminar etapa";
    openModalBtnClasses="mt-3 btn btn--primary";
    modalTitle="Finalizar etapa?";
    modalContent="Parece que ainda há jogadores que não terminaram a jogada. Finalizar a etapa mesmo assim?";

    constructor(
        private masterService: MasterService,
        private activatedRoute: ActivatedRoute,
        private alertService: AlertService
    ) { }

    ngOnInit(): void {
        this.idJogo = this.activatedRoute.snapshot.params.idJogo;
        this.hasUnfinishedPlayers = true;
        this.infoMundo$ = this.masterService.getInfoMundo(this.idJogo);
        this.putInMundo();

    }

    putInMundo(){
        this.infoMundo$.subscribe(
            (data: World) => {
                this.mundo = data;
                this.getSituacaoEtapa();
            },
            err => console.log(err)
        );
    }
    
    getSituacaoEtapa(){
        interval(10 * 1000)
            .pipe(
                flatMap(
                    () => this.masterService.getSituacaoEtapa(this.mundo.etapa)
                )
            )
            .subscribe(
                (data: number) => {
                    if(data == 0){
                        this.apareceBotao = false;
                    }
                    else if(data == 2){
                        this.apareceBotao = true;
                        this.masterService.changeFlagFimEtapa()
                            .subscribe(
                                () => this.alertService.info('Todos os jogadores começaram a etapa.'),
                                err => console.log(err)
                            );
                    }
                    else if(data == 3){
                        this.hasUnfinishedPlayers = false;
                    }
                },
                err => console.log(err)
            );
    }

    receiveUserChoice($event: boolean){
        this.finalizarEtapa($event);
    }

    finalizarEtapa(userChoice: boolean){
        if(userChoice){
            this.masterService.finalizarEtapa(this.idJogo)
                .subscribe(
                    () => {
                        this.alertService.success('Etapa terminada.');
                        this.hasUnfinishedPlayers = true;
                        this.infoMundo$ = this.masterService.getInfoMundo(this.idJogo);
                        this.putInMundo();
                    },
                    err => {
                        this.alertService.danger('Algo deu errado. Por favor, tente novamente.');
                        console.log(err);
                    }
                )
        }
    }
}
