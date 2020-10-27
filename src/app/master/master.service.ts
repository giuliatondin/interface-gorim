import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

import { World } from '../world/world';
import { PersonSimplified } from '../world/models/person.simplified';

const API = environment.ApiUrl;
const MASTER_ROUTE = '/request/api/mestre';

@Injectable({
    providedIn: 'root'
})
export class MasterService{
    
    constructor(
        private httpClient : HttpClient
    ){
        //
    }

    finalizarEtapa(idJogo: number){
        console.log("entra " + idJogo);
        return this.httpClient.post(
            API + MASTER_ROUTE + '/finalizarEtapa',
            null
        );
    }

    getEntrepreuners(){
        return this.httpClient.get(
            API + MASTER_ROUTE + '/empresarios'
        );
    }

    getAgriculturists(){
        return this.httpClient.get(
            API + MASTER_ROUTE + '/agricultores'
        );
    }

    getInfoMundo(
        idJogo: number
    ){
        return this.httpClient.get<World>(
            API + MASTER_ROUTE + '/infoMundo/' + idJogo
        );
    }

    verificaFinalizados(etapa: number){
        return this.httpClient.post<boolean[]>(
            API + MASTER_ROUTE + '/verificaFinalizados',
            etapa
        )
    }

    getInfoPessoas(etapa: number){
        return this.httpClient.post<PersonSimplified[]>(
            API + MASTER_ROUTE + '/infoPessoasByEtapa',
            etapa
        )
    }

    getSituacaoEtapa(etapa: number){
        return this.httpClient.get(
            API + MASTER_ROUTE + '/verificaFimEtapa/' + etapa
        );
    }

    changeFlagFimEtapa(){
        return this.httpClient.post(
            API + MASTER_ROUTE + '/changeFlagFimEtapa/',
            null
        );
    }
}
