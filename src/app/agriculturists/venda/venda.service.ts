import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { Venda } from 'src/app/agriculturists/venda/venda';

const API = environment.ApiUrl + '/request/api/agricultor/venda/';

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
        console.log("Entrou no adicionaVenda()" + idEmp);
        console.log(venda);
        return this.httpClient.post(
            API + idEmp,
            venda
        )
    }

    apagarOrcamento(
        idAgr: number,
        orcamento: Venda
    ){
        alert("Apagando");
        console.log("idAgr: " + idAgr)
        console.log(orcamento);
        return this.httpClient.post(
            API + 'delete/' + idAgr,
            orcamento
        )
    }

}