import { Component, Input, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import { AldermanSuggestion } from 'src/app/alderman/alderman-suggestion/alderman-suggestion';
import { AlertService } from 'src/app/world/alert/alert.service';
import { SuggestionListService } from './suggestion-list.service';

@Component({
    selector: 'app-suggestion-list',
    templateUrl: './suggestion-list.component.html',
    styleUrls: [ './suggestion-list.component.scss' ]
})
export class SuggestionListComponent implements OnInit{

    @Input() idJogo: number;
    @Input() idPref: number;

    quantidadeSugestoes: number = 0;
    suggestions: AldermanSuggestion[] = [];

    constructor(
        private suggestionListService: SuggestionListService,
        private alertService: AlertService
    ){ }

    ngOnInit(){
        this.getSuggestions();
    }

    getSuggestions(){
        interval(10 * 1000)
            .pipe(
                flatMap(() => this.suggestionListService.getSuggestions(this.idJogo, this.idPref))
            )
            .subscribe(
                (data: AldermanSuggestion[]) => {
                    if(this.quantidadeSugestoes < data.length){
                        this.quantidadeSugestoes = data.length;
                        this.alertService.info('Você tem novas sugestões do Vereador.');
                    }
                    this.suggestions = data;
                }
            );
    }

    isTaxSuggestion(response: AldermanSuggestion){
        if(response.tipoSugestao == 0) return false;
        return true;
    }

    sendResponse(response: AldermanSuggestion, aceito: boolean){
        response.aceito = aceito;
        this.suggestionListService.postResponse(this.idJogo, this.idPref, response).subscribe(
            () => {
                this.alertService.success('Resposta enviada.');
                this.quantidadeSugestoes--;
                this.suggestionListService.getSuggestions(this.idJogo, this.idPref).subscribe(
                    (data: AldermanSuggestion[]) => {
                        console.log(data);
                        this.suggestions = data;
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