import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Entrepreneur } from './entrepreneur/entrepreneur';

const API = environment.ApiUrl + '/request/api/empresario';

@Injectable({
    providedIn: 'root'
})
export class EntrepreunersService{
    
    constructor(
        private httpClient: HttpClient
    ){
        //
    }

    /**
     * 
     * @param numParcela 1~6
     * @param idProd 1~13
     * @param idAgr 5~[playerQuantity-4]
     * @param precoProd 'b' = 0 || 'm' = 1 || 'a' = 2
     */
    postEntrepreunerSellFormParcel(
        id: number,
        numParcela: number,
        idProd: number,
        idAgr: number,
        precoProd: number
    ){
        const formData = new FormData();
        formData.append('prod', idProd.toString());
        formData.append('idAgr', idAgr.toString());
        formData.append('numParcela', numParcela.toString());
        formData.append('precoProd', precoProd.toString());

        return this.httpClient.post(
            API + id + '/venda',
            formData
        );
    }

    postEntrepreunerForm(
        id: number,
        // array de transferencias
    ){
        const formData = new FormData();
        formData.append('id', id.toString());
        //formData.append('transferencias', );

        return this.httpClient.post(
            API,
            formData
        )
    }

    getHitory(
        id: number
    ){
        return this.httpClient.get(
            environment.ApiUrl + '/request/api/arquivoResumo/' + id
        );
    }

    getInfo(
        id: number
    ){
        return this.httpClient.get<Entrepreneur>(
            API + id
        );
    }
}
