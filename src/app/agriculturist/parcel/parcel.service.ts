import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { PostForm } from './postForm';

const API = environment.ApiUrl;
const AGR_ROUTE = '/request/api/agricultor';
const MASTER_ROUTE = '/request/api/mestre';

@Injectable({
    providedIn:'root'
})
export class ParcelService{

    constructor(
        private httpClient: HttpClient
    ){
        //
    }
    
    verificaFimEtapa(etapa: number){
        return this.httpClient.get(
            API + MASTER_ROUTE + '/verificaFimEtapa/' + etapa
        );
    }

    postAgricultiristForm(
        idAgr: number,
        postForm: PostForm
    ){
        console.log("idAgr ParcelService: " + idAgr);
        console.log('JSON: ' + JSON.stringify(postForm));
        return this.httpClient.post(
            API + AGR_ROUTE + '/' + idAgr,
            postForm
        );
    }
}