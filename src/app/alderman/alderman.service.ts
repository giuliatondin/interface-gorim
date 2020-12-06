import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { World } from '../world/world';
import { Alderman } from './alderman';

const API = environment.ApiUrl + '/request/api';
const VER_ROUTE = '/vereador';
const MASTER_ROUTE = '/mestre';

@Injectable({
    providedIn: 'root'
})
export class AldermanService {

    constructor(
        private httpClient: HttpClient
    ){ }

    getInfo(idJogo: number, idVer: number){
        return this.httpClient.get<Alderman>(
            API + '/' + idJogo + VER_ROUTE + '/' + idVer
        );
    }

    getInfoMundo(idJogo: number){
        return this.httpClient.get<World>(
            API + '/' + idJogo + MASTER_ROUTE + '/infoMundo'
        );
    }
    
    verificaFimEtapa(idJogo: number, etapa: number){
        return this.httpClient.get(
            API + '/' + idJogo + MASTER_ROUTE + '/verificaFimEtapa/' + etapa
        );
    }

    finalizaJogada(idJogo: number, idVer: number){
        return this.httpClient.post(
            API + '/' + idJogo + VER_ROUTE + '/' + idVer,
            null
        );
    }
}