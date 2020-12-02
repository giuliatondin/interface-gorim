import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FarmerHistory } from './farmer-history';

const API = environment.ApiUrl;
const HISTORY_ROUTE = '/request/api/arquivoResumo/';

@Injectable({
    providedIn: 'root'
})
export class FarmerHistoryService {

    constructor(
        private httpClient: HttpClient
    ){ }

    getHistory(
        idAgr: number
    ){
        return this.httpClient.get<FarmerHistory>(
            API + HISTORY_ROUTE + idAgr
        );
    }
}