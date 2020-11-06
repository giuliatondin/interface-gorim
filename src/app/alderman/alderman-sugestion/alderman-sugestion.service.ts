import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Mayor } from 'src/app/mayor/mayor';
import { environment } from 'src/environments/environment';
import { AldermanSugestion } from './alderman-sugestion';

const API = environment.ApiUrl;
const VER_ROUTE = '/request/api/vereador';

@Injectable({
    providedIn: 'root'
})
export class AldermanSugestionService {
    
    constructor(
        private httpClient: HttpClient
    ){ }

    getInfoPrefeito(idVer: number){
        return this.httpClient.get<Mayor>(
            API + VER_ROUTE + '/infoPrefeito/' + idVer
        );
    }

    postSugestion(idVer: number, sugestao: AldermanSugestion){
        return this.httpClient.post(
            API + VER_ROUTE + '/adicionaSugestao/' + idVer,
            sugestao
        );
    }
}