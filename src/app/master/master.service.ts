import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

import { World } from '../world/world';
import { PersonSimplified } from '../world/models/person.simplified';

const API = environment.ApiUrl + '/request/api';
const MASTER_ROUTE = '/mestre';

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
        return this.httpClient.post(
            API + '/' + idJogo + MASTER_ROUTE + '/finalizarEtapa',
            null
        );
    }

    getEntrepreuners(idJogo: number){
        return this.httpClient.get(
            API + '/' + idJogo + MASTER_ROUTE + '/empresarios'
        );
    }

    getFarmers(idJogo: number){
        return this.httpClient.get(
            API + '/' + idJogo + MASTER_ROUTE + '/agricultores'
        );
    }

    getInfoMundo(
        idJogo: number
    ){
        return this.httpClient.get<World>(
            API + '/' + idJogo + MASTER_ROUTE + '/infoMundo'
        );
    }

    verificaFinalizados(idJogo: number, etapa: number){
        return this.httpClient.post<boolean[]>(
            API + '/' + idJogo + MASTER_ROUTE + '/verificaFinalizados',
            etapa
        )
    }

    getInfoPessoas(idJogo: number, etapa: number){
        return this.httpClient.post<PersonSimplified[]>(
            API + '/' + idJogo + MASTER_ROUTE + '/infoPessoasByEtapa',
            etapa
        )
    }

    getSituacaoEtapa(idJogo: number, etapa: number){
        return this.httpClient.get(
            API + '/' + idJogo + MASTER_ROUTE + '/verificaFimEtapa/' + etapa
        );
    }

    changeFlagFimEtapa(idJogo: number){
        return this.httpClient.post(
            API + '/' + idJogo + MASTER_ROUTE + '/changeFlagFimEtapa',
            null
        );
    }
}
