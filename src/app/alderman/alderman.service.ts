import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { World } from '../world/world';
import { Alderman } from './alderman';

const API = environment.ApiUrl;
const VER_ROUTE = '/request/api/vereador';
const MASTER_ROUTE = '/request/api/mestre';

@Injectable({
    providedIn: 'root'
})
export class AldermanService {

    constructor(
        private httpClient: HttpClient
    ){ }

    getInfo(idVer: number){
        return this.httpClient.get<Alderman>(
            API + VER_ROUTE + '/' + idVer
        );
    }

    getInfoMundo(idJogo: number){
        return this.httpClient.get<World>(
            API + MASTER_ROUTE + '/infoMundo/' + idJogo
        );
    }
    
    verificaFimEtapa(etapa: number){
        return this.httpClient.get(
            API + MASTER_ROUTE + '/verificaFimEtapa/' + etapa
        );
    }

    finalizaJogada(idVer: number){
        return this.httpClient.post(
            API + VER_ROUTE + '/' + idVer,
            null
        );
    }
}