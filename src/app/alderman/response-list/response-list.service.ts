import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AldermanSugestion } from '../alderman-sugestion/alderman-sugestion';

const API = environment.ApiUrl;
const VER_ROUTE = '/request/api/vereador';

@Injectable({
    providedIn: 'root'
})
export class ResponseListService {
    
    constructor(
        private httpClient: HttpClient
    ){ }

    getResponses(idVer: number){
        return this.httpClient.get<AldermanSugestion[]>(
            API + VER_ROUTE + '/getRespostasPrefeito/' + idVer
        );
    }
}