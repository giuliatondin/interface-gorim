import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { EntrepreneurHistory } from './entrepreneur-history';

const API = environment.ApiUrl;
const HISTORY_ROUTE = '/request/api/arquivoResumo/';

@Injectable({
    providedIn: 'root'
})
export class EntrepreneurHistoryService{
    
    constructor(
        private httpClient: HttpClient
    ){ }

    getHitory(
        id: number
    ){
        return this.httpClient.get<EntrepreneurHistory>(
            API + HISTORY_ROUTE + id
        );
    }
}