import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { interval } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import { AlertService } from 'src/app/world/alert/alert.service';
import { AldermanSuggestion } from '../alderman-suggestion/alderman-suggestion';
import { ResponseListService } from './response-list.service';

@Component({
    selector: 'app-response-list',
    templateUrl: './response-list.component.html',
    styleUrls: [ 'response-list.component.scss' ]
})
export class ResponseListComponent implements OnInit {
    @Input() idJogo: number;
    @Input() idVer: number;

    quantidadeRespostas: number = 0;
    responses: AldermanSuggestion[] = [];

    constructor(
        private responseListService: ResponseListService,
        private alertService: AlertService
    ){ }

    ngOnInit(){
        this.getResponses();
    }

    getResponses(){
        interval(10 * 1000)
            .pipe(
                flatMap(() => this.responseListService.getResponses(this.idJogo, this.idVer))
            )
            .subscribe(
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