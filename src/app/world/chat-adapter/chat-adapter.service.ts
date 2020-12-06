import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PersonSimplified } from '../models/person.simplified';

const API = environment.ApiUrl + '/request/api';
const CHAT_ROUTE = '/chat';

@Injectable({
    providedIn: 'root'
})
export class ChatAdapterService {
    
    constructor(
        private httpClient: HttpClient
    ){ }

    getContactList(idJogo: number, idPessoa: number){
        return this.httpClient.get<PersonSimplified[]>(
            API + '/' + idJogo + CHAT_ROUTE + '/listaContatoChat/' + idPessoa
        );
    }
}