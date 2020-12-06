import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AldermanSugestion } from '../alderman-sugestion/alderman-sugestion';

const API = environment.ApiUrl + '/request/api';
const VER_ROUTE = '/vereador';

@Injectable({
    providedIn: 'root'
})
export class ResponseListService {
    
    constructor(
        private httpClient: HttpClient
    ){ }

    getResponses(
        idJogo: number,
        idVer: number
    ){
        return this.httpClient.get<AldermanSugestion[]>(
            API + '/' + idJogo + VER_ROUTE + '/getRespostasPrefeito/' + idVer
        );
    }
}