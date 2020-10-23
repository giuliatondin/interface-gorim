import { Component, OnInit } from '@angular/core';
import { interval, Observable } from 'rxjs';

import { MasterService } from './master.service';
import { World } from '../world/world';
import { ActivatedRoute } from '@angular/router';
import { flatMap } from 'rxjs/operators';
import { PersonSimplified } from '../world/models/person.simplified';

@Component({
    selector: 'app-master',
    templateUrl: './master.component.html',
    styleUrls: ['./master.component.scss']
})
export class MasterComponent implements OnInit {

    infoMundo$: Observable<World>;
    mundo: World;
    idJogo: number;

    finalizadosEtapa: boolean[];
    pessoas: PersonSimplified[];

    // coisas do modal
    openModalBtnText="Terminar etapa";
    openModalBtnClasses="mt-3 btn btn--primary";
    modalTitle="Finalizar etapa?";
    modalContent="Parece que ainda há jogadores que não terminaram a jogada. Finalizar a etapa mesmo assim?";

    constructor(
        private masterService: MasterService,
        private activatedRoute: ActivatedRoute
    ) { }

    ngOnInit(): void {
        this.infoMundo$ = this.masterService.getInfoMundo(this.activatedRoute.snapshot.params.idJogo);
        this.putInMundo();

    }

    putInMundo(){
        this.infoMundo$.subscribe(
            (data: World) => {
                this.mundo = data;
                this.verificaFinalizados();
                this.getInfoPessoas();
                this.masterService.verificaFinalizados(this.mundo.etapa)
                    .subscribe(
                        (data: boolean[]) => {
                            this.finalizadosEtapa = data;
                        },
                        err => console.log(err)
                    );
            },
            err => console.log(err)
        );
    }

    verificaFinalizados(){
        interval(10 * 1000)
            .pipe(
                flatMap(() => this.masterService.verificaFinalizados(this.mundo.etapa))
            )
            .subscribe(
                (data: boolean[]) => {
                    this.finalizadosEtapa = data;
                },
                err => console.log(err)
            );
    }

    getInfoPessoas(){
        this.masterService.getInfoPessoas(this.mundo.etapa)
            .subscribe(
                (data: PersonSimplified[]) => {
                    this.pessoas = data;
                },
                err => console.log(err)
            )
    }

    getColour(finalizado: boolean){
        if(finalizado) return 'finalizado';
        else return 'naoFinalizado';
    }

    hasUnfinishedPlayers(){
        let hasUnfinishedPlayers = true;
        if(this.finalizadosEtapa){
            this.finalizadosEtapa.forEach(
                element =>  {
                    if(!element) hasUnfinishedPlayers = true;
                }
            );
        }
        return hasUnfinishedPlayers;
    }

    receiveUserChoice($event: boolean){
        this.finalizarEtapa($event);
    }

    finalizarEtapa(userChoice: boolean){
        if(userChoice){
            this.masterService.finalizarEtapa();
        }
    }
}
