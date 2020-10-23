import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

import { World } from '../world/world';
import { PersonSimplified } from '../world/models/person.simplified';

const API = environment.ApiUrl + '/request/api/mestre';

@Injectable({
    providedIn: 'root'
})
export class MasterService{
    
    constructor(
        private httpClient : HttpClient
    ){
        //
    }

    finalizarEtapa(){
        this.httpClient.post(
            API + '/finalizarEtapa',
            null
        );
    }

    getEntrepreuners(){
        return this.httpClient.get(
            API + '/empresarios'
        );
    }

    getAgriculturists(){
        return this.httpClient.get(
            API + '/agricultores'
        );
    }

    getInfoMundo(
        idJogo: number
    ){
        return this.httpClient.get<World>(
            API + '/infoMundo/' + idJogo
        );
    }

    verificaFinalizados(etapa: number){
        return this.httpClient.post<boolean[]>(
            API + '/verificaFinalizados',
            etapa
        )
    }

    getInfoPessoas(etapa: number){
        return this.httpClient.post<PersonSimplified[]>(
            API + '/infoPessoas',
            etapa
        )
    }
}
