import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { PostForm } from './postForm';

const API = environment.ApiUrl + '/request/api';
const AGR_ROUTE = '/agricultor';
const MASTER_ROUTE = '/mestre';

@Injectable({
    providedIn:'root'
})
export class ParcelService{

    constructor(
        private httpClient: HttpClient
    ){
        //
    }
    
    verificaFimEtapa(idJogo: number, etapa: number){
        return this.httpClient.get(
            API + '/' + idJogo + MASTER_ROUTE + '/verificaFimEtapa/' + etapa
        );
    }

    postAgricultiristForm(
        idJogo: number,
        idAgr: number,
        postForm: PostForm
    ){
        return this.httpClient.post(
            API + '/' + idJogo + AGR_ROUTE + '/' + idAgr,
            postForm
        );
    }
}