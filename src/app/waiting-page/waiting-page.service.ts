import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { World } from '../world/world';

const API = environment.ApiUrl + '/request/api';
const MASTER_ROUTE = '/mestre';

@Injectable({
    providedIn: 'root'
})
export class WaitingPageService{

    constructor(
        private httpClient: HttpClient
    ){ }

    getPapelSegundaEtapa(idJogo: number, idPessoa: number){
        return this.httpClient.get(
            API + '/' + idJogo + MASTER_ROUTE + '/papelSegundaEtapa/' + idPessoa
        );
    }

    getInfoMundo(idJogo: number){
        return this.httpClient.get<World>(
            API + '/' + idJogo + MASTER_ROUTE + '/infoMundo'
        )
    }

    verificaFimEtapa(idJogo: number, etapa: number){
        return this.httpClient.get(
            API + '/' + idJogo + MASTER_ROUTE + '/verificaFimEtapa/' + etapa
        );
    }
}