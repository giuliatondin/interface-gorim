import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { Venda } from 'src/app/farmer/venda/venda';

const API = environment.ApiUrl;
const AGR_ROUTE = '/request/api/agricultor/venda/';
const ADD_ORC_ROUTE = '/request/api/empresario/venda/';

@Injectable({
    providedIn: 'root'
})
export class VendaService {

    constructor(
        private httpClient: HttpClient
    ){
        //
    }

    getOrcamentos(
        idAgr: number
    ){
        return this.httpClient.get<Venda[]>(
            API + AGR_ROUTE + idAgr
        );
    }

    adicionaVendaById(
        idEmp: number,
        venda: Venda
    ){
        return this.httpClient.post(
            API + AGR_ROUTE + idEmp,
            venda
        )
    }

    apagarOrcamento(
        idAgr: number,
        orcamento: Venda
    ){
        console.log("Apagando");
        return this.httpClient.post(
            API + AGR_ROUTE + 'delete/' + orcamento.idEmp + '/' + idAgr,
            orcamento.idOrcamento
        )
    }

    adicionaOverOrcamento(
        idAgr,
        orcamento: Venda
    ){
        console.log("Adicionando orcamento a mais");
        return this.httpClient.post(
            API + ADD_ORC_ROUTE + idAgr,
            orcamento
        )
    }

}