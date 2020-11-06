import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PostForm } from './postForm';
import { World } from '../world/world';
import { Mayor } from './mayor';

const API = environment.ApiUrl;
const MAYOR_ROUTE = '/request/api/prefeito';
const MASTER_ROUTE = '/request/api/mestre';

@Injectable({
    providedIn: 'root'
})
export class MayorService {
    
    constructor(
        private httpClient: HttpClient
    ){ }

    getInfo(idPref: number){
        return this.httpClient.get<Mayor>(
            API + MAYOR_ROUTE + '/' + idPref
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

    finalizaJogada(
        idPref: number,
        postForm: PostForm
    ){
        return this.httpClient.post(
            API + MAYOR_ROUTE + '/' + idPref,
            postForm
        )
    }
}