import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AldermanHistory } from './alderman-history';

const API = environment.ApiUrl;
const HISTORY_ROUTE = '/request/api/arquivoResumo/';

@Injectable({
    providedIn: 'root'
})
export class AldermanHistoryService{
    
    constructor(
        private httpClient: HttpClient
    ){ }

    getHitory(
        id: number
    ){
        return this.httpClient.get<AldermanHistory>(
            API + HISTORY_ROUTE + id
        );
    }
}