import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';

const API = environment.ApiUrl;
const MASTER_ROUTE = '/request/api/master';

@Injectable({
    providedIn: 'root'
})
export class AlternativeSecondStagePageService {
    constructor(
        private httpClient: HttpClient
    ){ }

    verificaFimEtapa(etapa: number){
        return this.httpClient.get(
            API + MASTER_ROUTE + '/verificaFimEtapa/' + etapa
        );
    }
}