import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';

const API = environment.ApiUrl;
const MASTER_ROUTE = '/request/api/mestre';

@Injectable()
export class BeginService{
    
    constructor(
        private http: HttpClient
    ){
        //
    }

    iniciaJogada(
        quantidadeJogadores: number
    ){
        return this.http.post(
            API + MASTER_ROUTE,
            {quantidadeJogadores}
        );
    }
    
}