import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { World } from '../world/world';

const API = environment.ApiUrl;
const MASTER_ROUTE = '/request/api/mestre';

@Injectable({
    providedIn: 'root'
})
export class WaitingPageService{

    constructor(
        private httpClient: HttpClient
    ){ }

    getPapelSegundaEtapa(idPessoa: number){
        return this.httpClient.get(
            API + MASTER_ROUTE + '/papelSegundaEtapa/' + idPessoa
        );
    }

    getInfoMundo(idJogo: number){
        return this.httpClient.get<World>(
            API + MASTER_ROUTE + '/infoMundo/' + idJogo
        )
    }

    verificaFimEtapa(etapa: number){
        return this.httpClient.get(
            API + MASTER_ROUTE + '/verificaFimEtapa/' + etapa
        );
    }
}