import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

const API = environment.ApiUrl + '/mestre';

@Injectable({
    providedIn: 'root'
})
export class MasterService{
    
    constructor(
        private httpClient : HttpClient
    ){
        //
    }

    iniciaJogada(
        playerQuantity : number
    ){
        const formData = new FormData();
        formData.append("playerQuantity", playerQuantity.toString());
        return this.httpClient.post(
            API,
            formData
        );
    }

    finalizarEtapa(){
        this.httpClient.post(
            API + '/finalizarEtapa',
            null
        );
    }

    getEntrepreuners(){
        return this.httpClient.get(
            API + '/empresarios'
        );
    }

    getAgriculturists(){
        return this.httpClient.get(
            API + '/agricultores'
        );
    }
}