import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { Venda } from 'src/app/farmer/venda/venda';

const API = environment.ApiUrl + '/request/api/empresario/venda/';

@Injectable({
    providedIn: 'root'
})
export class VendaService {

    constructor(
        private httpClient: HttpClient
    ){
        //
    }

    getVendas(
        idEmp: number
    ){
        return this.httpClient.get<Venda[]>(
            API + idEmp
        );
    }

}