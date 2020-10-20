import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { PersonSimplified } from '../models/person.simplified';
import { Transfer } from './transfer';

const API = environment.ApiUrl + '/request/api/mestre'

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
        return this.httpClient.get<PersonSimplified[]>(
            API + '/infoPessoas'
        );
    }

    postTransfer(formData: Transfer){
        return this.httpClient.post(
            API + '/adicionaTransferencia',
            formData
        )
    }
}