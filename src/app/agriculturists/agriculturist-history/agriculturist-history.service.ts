import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AgriculturistHistory } from './agriculturist-history';

const API = environment.ApiUrl;
const HISTORY_ROUTE = '/request/api/arquivoResumo/';

@Injectable({
    providedIn: 'root'
})
export class AgriculturistHistoryService {

    constructor(
        private httpClient: HttpClient
    ){ }

    getHistory(
        idAgr: number
    ){
        return this.httpClient.get<AgriculturistHistory>(
            API + HISTORY_ROUTE + idAgr
        );
    }
}