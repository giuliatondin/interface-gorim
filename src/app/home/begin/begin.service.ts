import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';

const API = environment.ApiUrl + '/request/api';
const MASTER_ROUTE = '/mestre';

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
        return this.http.post<number>(
            API + MASTER_ROUTE,
            {quantidadeJogadores}
        );
    }
    
}