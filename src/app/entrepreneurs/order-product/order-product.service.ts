import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Venda } from 'src/app/entrepreneurs/venda/venda';
import { environment } from 'src/environments/environment';

const API = environment.ApiUrl + '/request/api/empresario/venda/';

@Injectable({
    providedIn: 'root'
})
export class OrderProductService {
    
    constructor(
        private httpClient: HttpClient
    ){
        //
    }

    adicionarOrcamento(
        idAgr: number,
        venda: Venda
    ){
        return this.httpClient.post(
            API + idAgr,
            venda
        );
    }
}