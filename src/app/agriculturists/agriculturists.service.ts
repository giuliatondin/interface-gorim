import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

import { environment } from 'src/environments/environment';
import { Agriculturist } from './agriculturist/agriculturist';
import { World } from '../world/world';
import { ProdutoSimplified } from '../world/models/produto.simplified';

const API = environment.ApiUrl + '/request/api/agricultor';
const APIMundo = environment.ApiUrl + '/request/api/mestre';

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

    getInfoMundo(
        idJogo: number
    ){
        return this.httpClient.get<World>(
            APIMundo + '/infoMundo/' + idJogo
        );
    }

    getProdutosEmpresarios(){
        return this.httpClient.get<ProdutoSimplified[]>(
            API + '/empresarios/produtos'
        )
    }

}
