import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { Venda } from 'src/app/agriculturists/venda/venda';

const API = environment.ApiUrl + '/request/api/agricultor/venda/';
const APIAdicionaOrcamento = environment.ApiUrl + '/request/api/empresario/venda/';

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
            API + idAgr
        );
    }

    adicionaVendaById(
        idEmp: number,
        venda: Venda
    ){
        return this.httpClient.post(
            API + idEmp,
            venda
        )
    }

    apagarOrcamento(
        idAgr: number,
        orcamento: Venda
    ){
        console.log("Apagando");
        return this.httpClient.post(
            API + 'delete/' + orcamento.idEmp + '/' + idAgr,
            orcamento.idOrcamento
        )
    }

    adicionaOverOrcamento(
        idAgr,
        orcamento: Venda
    ){
        console.log("Adicionando orcamento a mais");
        return this.httpClient.post(
            APIAdicionaOrcamento + idAgr,
            orcamento
        )
    }

}