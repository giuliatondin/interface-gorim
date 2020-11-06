import { Component, Input, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import { AlertService } from 'src/app/world/alert/alert.service';
import { AldermanSugestion } from '../alderman-sugestion/alderman-sugestion';
import { ResponseListService } from './response-list.service';

@Component({
    selector: 'app-response-list',
    templateUrl: './response-list.component.html',
    styleUrls: [ 'response-list.component.scss' ]
})
export class ResponseListComponent implements OnInit {

    @Input() idVer: number;
    responses: AldermanSugestion[];

    constructor(
        private responseListService: ResponseListService
    ){ }

    ngOnInit(){
        this.getResponses();
    }

    getResponses(){
        interval(10 * 1000)
            .pipe(
                flatMap(() => this.responseListService.getResponses(this.idVer))
            )
            .subscribe(
                (data: AldermanSugestion[]) => {
                    this.responses = data;
                }
            );
    }

    getColour(sucesso: boolean){
        if(sucesso) return 'sugestaoSucesso';
        else return 'sugestaoFalha';
    }

    isTaxSugestion(response: AldermanSugestion){
        if(response.tipoSugestao == 0) return false;
        return true;
    }
}