import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

import { environment } from 'src/environments/environment';
import { Agriculturist } from './agriculturist';
import { World } from '../world/world';
import { ProdutoSimplified } from '../world/models/produto.simplified';

const API = environment.ApiUrl;
const AGR_ROUTE = '/request/api/agricultor';
const MASTER_ROUTE = '/request/api/mestre';

@Injectable({
    providedIn: 'root'
})
export class AgriculturistService{
    
    constructor(
        private httpClient: HttpClient
    ){
        //
    }

    getInfo(id: number){
        return this.httpClient.get<Agriculturist>(
            API + AGR_ROUTE + '/' + id
        );
    }

    getInfoMundo(
        idJogo: number
    ){
        return this.httpClient.get<World>(
            API + MASTER_ROUTE + '/infoMundo/' + idJogo
        );
    }

    getProdutosEmpresarios(){
        return this.httpClient.get<ProdutoSimplified[]>(
            API + AGR_ROUTE + '/empresarios/produtos'
        )
    }

}
