import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';

const API = environment.ApiUrl;
const MASTER_ROUTE = '/request/api/mestre';

@Injectable()
export class HomeService{
    
    constructor(
        private httpClient: HttpClient
    ){
        //
    }

    iniciaJogada(
        quantidadeJogadores: number
    ){
        //const formData = new FormData();
        //formData.append("quantidadeJogadores", quantidadeJogadores.toString());
        console.log("Aqui entra.");
        return this.httpClient.post(
            API + MASTER_ROUTE,
            {quantidadeJogadores}
        );
    }
    
}