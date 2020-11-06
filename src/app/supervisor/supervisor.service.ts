import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { World } from '../world/world';
import { PostForm } from './postForm';
import { Supervisor } from './supervisor';

const API = environment.ApiUrl;
const SUPERVISOR_ROUTE = '/request/api/fiscal';
const MASTER_ROUTE = '/request/api/mestre';

@Injectable({
    providedIn: 'root'
})
export class SupervisorService {
    
    constructor(
        private httpClient: HttpClient
    ){ }

    getInfo(idFis: number){
        return this.httpClient.get<Supervisor>(
            API + SUPERVISOR_ROUTE + '/' + idFis
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
        idFis: number,
        postForm: PostForm
    ){
        return this.httpClient.post(
            API + SUPERVISOR_ROUTE + '/' + idFis,
            {idFis}
        )
    }
}