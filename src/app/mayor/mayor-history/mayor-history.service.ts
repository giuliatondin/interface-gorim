import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MayorHistory } from './mayor-history';

const API = environment.ApiUrl;
const HISTORY_ROUTE = '/request/api/arquivoResumo/';

@Injectable({
    providedIn: 'root'
})
export class MayorHistoryService{
    
    constructor(
        private httpClient: HttpClient
    ){ }

    getHitory(
        id: number
    ){
        return this.httpClient.get<MayorHistory>(
            API + HISTORY_ROUTE + id
        );
    }
}