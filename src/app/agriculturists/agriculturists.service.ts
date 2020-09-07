import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

import { environment } from 'src/environments/environment';
import { Agriculturist } from './agriculturist/agriculturist';

const API = environment.ApiUrl + '/request/api/agricultor';

@Injectable({
    providedIn: 'root'
})
export class AgriculturistsService{
    
    constructor(
        private httpClient: HttpClient
    ){
        //
    }

    getInfo(id: number){
        return this.httpClient.get<Agriculturist>(
            API + '/' + id
        );
    }

    getHistory(
        id: number
    ){
        return this.httpClient.get(
            environment.ApiUrl + '/requset/api/arquivoResumo/' + id
        );
    }
    
    postAgricultiristForm(
        id: number,
        //transferencias: array,
        //pedidos: array
    ){
        const formData = new FormData();
        formData.append("id", id.toString());
        // formData.append("transferencias", );
        // formData.append("pedidos", );

        return this.httpClient.post(
            API,
            formData
        );
    }

}
