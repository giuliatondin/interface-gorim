import { Component, Input, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import { AldermanSugestion } from 'src/app/alderman/alderman-sugestion/alderman-sugestion';
import { AlertService } from 'src/app/world/alert/alert.service';
import { SugestionListService } from './sugestion-list.service';

@Component({
    selector: 'app-sugestion-list',
    templateUrl: './sugestion-list.component.html',
    styleUrls: [ './sugestion-list.component.scss' ]
})
export class SugestionListComponent implements OnInit{

    @Input() idPref: number;

    sugestions: AldermanSugestion[];

    constructor(
        private sugestionListService: SugestionListService,
        private alertService: AlertService
    ){ }

    ngOnInit(){ }

    getSugestions(){
        interval(10 * 1000)
            .pipe(
                flatMap(() => this.sugestionListService.getSugestions(this.idPref))
            )
            .subscribe(
                (data: AldermanSugestion[]) => {
                    this.sugestions = data;
                }
            );
    }

    isTaxSugestion(response: AldermanSugestion){
        if(response.tipoSugestao == 0) return false;
        return true;
    }

    sendResponse(response: AldermanSugestion, aceito: boolean){
        response.aceito = aceito;
        this.sugestionListService.postResponse(this.idPref, response).subscribe(
            () => {
                this.alertService.success('Resposta enviada.');
                this.sugestionListService.getSugestions(this.idPref).subscribe(
                    (data: AldermanSugestion[]) => {
                        this.sugestions = data;
                    },
                    err => console.log(err)
                );
            },
            err => {
                console.log(err);
                this.alertService.danger('Algo deu errado. Por favor, tente novamente.')
            }
        );
    }
}