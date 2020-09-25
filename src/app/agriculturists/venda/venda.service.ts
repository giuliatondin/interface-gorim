import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { Venda } from 'src/app/agriculturists/venda/venda';

const API = environment.ApiUrl + '/request/api/agricultor/';

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
            API + 'venda/' + idAgr
        );
    }

    adicionaVendaById(
        idAgr: number,
        idEmp: number,
        venda: Venda
    ){
        return this.httpClient.post(
            API + idAgr + '/venda/' + idEmp,
            venda
        )
    }

}