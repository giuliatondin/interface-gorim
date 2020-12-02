import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Businessman } from './businessman';
import { World } from '../world/world';
import { PersonSimplified } from '../world/models/person.simplified';

const API = environment.ApiUrl;
const EMP_ROUTE = '/request/api/empresario';
const MASTER_ROUTE = '/request/api/mestre';

@Injectable({
    providedIn: 'root'
})
export class BusinessmanService{
    
    constructor(
        private httpClient: HttpClient
    ){
        //
    }

    getInfo(
        id: number
    ){
        return this.httpClient.get<Businessman>(
            API + EMP_ROUTE + '/' + id
        );
    }

    getInfoMundo(
        idJogo: number
    ){
        return this.httpClient.get<World>(
            API + MASTER_ROUTE + '/infoMundo/' + idJogo
        );
    }

    getInfoAgricultores(){
        return this.httpClient.post<PersonSimplified[]>(
            API + MASTER_ROUTE +'/infoPessoasByClasse',
            2
        );
    }
    
    verificaFimEtapa(etapa: number){
        return this.httpClient.get(
            API + MASTER_ROUTE + '/verificaFimEtapa/' + etapa
        );
    }

    finalizaJogada(
        idEmp: number
    ){
        return this.httpClient.post(
            API + EMP_ROUTE + '/' + idEmp,
            {idEmp}
        )
    }
}
