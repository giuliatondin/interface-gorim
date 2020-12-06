import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AldermanSugestion } from 'src/app/alderman/alderman-sugestion/alderman-sugestion';
import { environment } from 'src/environments/environment';

const API = environment.ApiUrl + '/request/api';
const PREF_ROUTE = '/prefeito';

@Injectable({
    providedIn: 'root'
})
export class SugestionListService {
    
    constructor(
        private httpClient: HttpClient
    ){ }

    getSugestions(idJogo: number, idPref: number){
        return this.httpClient.get<AldermanSugestion[]>(
            API + '/' + idJogo + PREF_ROUTE + '/getSugestoesVereador/' + idPref
        );
    }

    postResponse(
        idJogo: number,
        idPref: number,
        response: AldermanSugestion
    ){
        return this.httpClient.post(
            API + '/' + idJogo + PREF_ROUTE + '/adicionaRespostaSugestao/' + idPref,
            response
        );
    }
}