import { Component, Input, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import { PersonSimplified } from 'src/app/world/models/person.simplified';
import { MasterService } from '../master.service';

@Component({
    selector: 'app-rightsidebar',
    templateUrl: './rightside-bar.component.html',
    styleUrls: [ './rightside-bar.component.scss' ]
})
export class RightSideBarComponent implements OnInit {
    @Input() idJogo: number;
    @Input() etapa: number;
    finalizadosEtapa: boolean[] = [];
    pessoas: PersonSimplified[] = [];

    constructor(
        private masterService: MasterService
    ){ }

    ngOnInit(){
        this.masterService.verificaFinalizados(this.idJogo, this.etapa)
            .subscribe(
                (data: boolean[]) => {
                    this.finalizadosEtapa = data;
                    this.verificaFinalizados();
                    this.getInfoPessoas();
                },
                err => console.log(err)
            );
    }

    getColour(finalizado: boolean){
        if(finalizado) return 'finalizado';
        else return 'naoFinalizado';
    }

    verificaFinalizados(){
        interval(10 * 1000)
            .pipe(
                flatMap(() => this.masterService.verificaFinalizados(this.idJogo, this.etapa))
            )
            .subscribe(
                (data: boolean[]) => {
                    this.finalizadosEtapa = data;
                    this.getInfoPessoas();
                },
                err => console.log(err)
            );
    }

    getInfoPessoas(){
        this.masterService.getInfoPessoas(this.idJogo, this.etapa)
            .subscribe(
                (data: PersonSimplified[]) => {
                    this.pessoas = data;
                },
                err => console.log(err)
            )
    }
}