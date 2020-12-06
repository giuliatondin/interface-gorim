import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Mayor } from 'src/app/mayor/mayor';
import { environment } from 'src/environments/environment';
import { AldermanSugestion } from './alderman-sugestion';

const API = environment.ApiUrl + '/request/api';
const VER_ROUTE = '/vereador';

@Injectable({
    providedIn: 'root'
})
export class AldermanSugestionService {
    
    constructor(
        private httpClient: HttpClient
    ){ }

    getInfoPrefeito(
        idJogo: number,
        idVer: number
    ){
        return this.httpClient.get<Mayor>(
            API + '/' + idJogo + VER_ROUTE + '/infoPrefeito/' + idVer
        );
    }

    postSugestion(
        idJogo: number,
        idVer: number,
        sugestao: AldermanSugestion
    ){
        return this.httpClient.post(
            API + '/' + idJogo + VER_ROUTE + '/adicionaSugestao/' + idVer,
            sugestao
        );
    }
}