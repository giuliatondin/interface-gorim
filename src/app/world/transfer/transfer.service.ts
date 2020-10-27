import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { PersonSimplified } from '../models/person.simplified';
import { Transfer } from './transfer';

const API = environment.ApiUrl;
const MASTER_ROUTE = '/request/api/mestre';

@Injectable({
    providedIn: 'root'
})
export class TransferService{
    
    constructor(
        private httpClient: HttpClient
    ){
        //
    }

    getInfoPessoas(){
        return this.httpClient.post<PersonSimplified[]>(
            API + MASTER_ROUTE + '/infoPessoasByEtapa',
            0
        );
    }

    postTransfer(formData: Transfer){
        return this.httpClient.post(
            API + MASTER_ROUTE + '/adicionaTransferencia',
            formData
        )
    }
}