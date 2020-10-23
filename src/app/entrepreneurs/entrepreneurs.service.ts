import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Entrepreneur } from './entrepreneur/entrepreneur';
import { World } from '../world/world';
import { PersonSimplified } from '../world/models/person.simplified';

const API = environment.ApiUrl + '/request/api/empresario';
const APIMundo = environment.ApiUrl + '/request/api/mestre';

@Injectable({
    providedIn: 'root'
})
export class EntrepreunersService{
    
    constructor(
        private httpClient: HttpClient
    ){
        //
    }

    finalizaJogada(
        idEmp: number
    ){
        return this.httpClient.post(
            API + '/' + idEmp,
            {idEmp}
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
            API + "/" + id
        );
    }

    getInfoMundo(
        idJogo: number
    ){
        return this.httpClient.get<World>(
            APIMundo + '/infoMundo/' + idJogo
        );
    }

    getInfoAgricultores(){
        return this.httpClient.post<PersonSimplified[]>(
            APIMundo +'/infoPessoasByClasse',
            2
        );
    }
}
