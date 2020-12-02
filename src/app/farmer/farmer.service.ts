import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

import { environment } from 'src/environments/environment';
import { Farmer } from './farmer';
import { World } from '../world/world';
import { ProdutoSimplified } from '../world/models/produto.simplified';

const API = environment.ApiUrl;
const AGR_ROUTE = '/request/api/agricultor';
const MASTER_ROUTE = '/request/api/mestre';

@Injectable({
    providedIn: 'root'
})
export class FarmerService{
    
    constructor(
        private httpClient: HttpClient
    ){
        //
    }

    getInfo(id: number){
        return this.httpClient.get<Farmer>(
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
