import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

import { environment } from 'src/environments/environment';
import { Farmer } from './farmer';
import { World } from '../world/world';
import { ProdutoSimplified } from '../world/models/produto.simplified';

const API = environment.ApiUrl + '/request/api';
const AGR_ROUTE = '/agricultor';
const MASTER_ROUTE = '/mestre';

@Injectable({
    providedIn: 'root'
})
export class FarmerService{
    
    constructor(
        private httpClient: HttpClient
    ){
        //
    }

    getInfo(idJogo: number, idAgr: number){
        return this.httpClient.get<Farmer>(
            API + '/' + idJogo + AGR_ROUTE + '/' + idAgr
        );
    }

    getInfoMundo(
        idJogo: number
    ){
        return this.httpClient.get<World>(
            API + '/' + idJogo + MASTER_ROUTE + '/infoMundo'
        );
    }

    getProdutosEmpresarios(idJogo: number){
        return this.httpClient.get<ProdutoSimplified[]>(
            API + '/' + idJogo + AGR_ROUTE + '/empresarios/produtos'
        )
    }

}
