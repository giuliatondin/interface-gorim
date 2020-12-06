import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PostForm } from './postForm';
import { World } from '../world/world';
import { Mayor } from './mayor';

const API = environment.ApiUrl + '/request/api';
const MAYOR_ROUTE = '/prefeito';
const MASTER_ROUTE = '/mestre';

@Injectable({
    providedIn: 'root'
})
export class MayorService {
    
    constructor(
        private httpClient: HttpClient
    ){ }

    getInfo(idJogo: number, idPref: number){
        return this.httpClient.get<Mayor>(
            API + '/' + idJogo + MAYOR_ROUTE + '/' + idPref
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

    finalizaJogada(
        idJogo: number,
        idPref: number,
        postForm: PostForm
    ){
        return this.httpClient.post(
            API + '/' + idJogo + MAYOR_ROUTE + '/' + idPref,
            postForm
        )
    }
}