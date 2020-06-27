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
     * @param numParcel 1~6
     * @param idProduct 1~13
     * @param idAgriculturist 5~[playerQuantity-4]
     * @param productPrice 'b' = 0 || 'm' = 1 || 'a' = 2
     */
    postEntrepreunerSellFormParcel(
        idEntrepreuner: number,
        numParcel: number,
        idProduct: number,
        idAgriculturist: number,
        productPrice: number
    ){
        const formData = new FormData();
        formData.append('prod', idProduct.toString());
        formData.append('idAgr', idAgriculturist.toString());
        formData.append('numParcela', numParcel.toString());
        formData.append('precoProd', productPrice.toString());

        return this.httpClient.post(
            API + idEntrepreuner + '/venda',
            formData
        );
    }

    postEntrepreunerForm(
        id: number,
        // array de transferencias
    ){
        const formData = new FormData();
        formData.append('id', id.toString());
        //formData.append('transfers', );

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