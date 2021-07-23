import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { interval, Observable, Subscription } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import { AlertService } from 'src/app/world/alert/alert.service';
import { AldermanSuggestion } from '../alderman-suggestion/alderman-suggestion';
import { AldermanService } from '../alderman.service';
import { ResponseListService } from './response-list.service';

@Component({
    selector: 'app-response-list',
    templateUrl: './response-list.component.html',
    styleUrls: [ 'response-list.component.scss' ]
})
export class ResponseListComponent implements OnInit, OnDestroy {
    @Input() idJogo: number;
    @Input() idVer: number;

    quantidadeRespostas: number = 0;
    responses: AldermanSuggestion[] = [];

    private newResponsesSubscription: Subscription;

    constructor(
        private responseListService: ResponseListService,
        private alertService: AlertService,
        private verService: AldermanService
    ){ }

    ngOnInit(){
        this.responseListService.getResponses(this.idJogo, this.idVer).subscribe(
            (data: AldermanSuggestion[]) => {
                if(data != null){
                    if(this.quantidadeRespostas < data.length){
                        this.quantidadeRespostas = data.length;
                        this.alertService.info('Você tem novas respostas do Prefeito.');
                    }
                    this.responses = data;
                }
            }
        );

        this.newResponsesSubscription = this.verService.sharedSuggestions.subscribe(
            (newSuggestionResponse: AldermanSuggestion) => { 
                if(newSuggestionResponse != null){
                    this.quantidadeRespostas++;
                    this.responses.push(newSuggestionResponse);
                }
            }
        );
    }

    ngOnDestroy(){
        this.newResponsesSubscription.unsubscribe();
    }

    getColour(sucesso: boolean){
        if(sucesso) return 'sugestaoSucesso';
        else return 'sugestaoFalha';
    }

    isTaxSuggestion(response: AldermanSuggestion){
        if(response.tipoSugestao == 0) return false;
        return true;
    }
}