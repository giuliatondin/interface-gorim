import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AldermanSugestion } from 'src/app/alderman/alderman-sugestion/alderman-sugestion';
import { environment } from 'src/environments/environment';

const API = environment.ApiUrl;
const PREF_ROUTE = '/request/api/prefeito';

@Injectable({
    providedIn: 'root'
})
export class SugestionListService {
    
    constructor(
        private httpClient: HttpClient
    ){ }

    getSugestions(idPref: number){
        return this.httpClient.get<AldermanSugestion[]>(
            API + PREF_ROUTE + '/getSugestoesVereador/' + idPref
        );
    }

    postResponse(idPref: number, response: AldermanSugestion){
        return this.httpClient.post(
            API + PREF_ROUTE + '/adicionaRespostaSugestao/' + idPref,
            response
        );
    }
}