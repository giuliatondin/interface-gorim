import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

import { environment } from 'src/environments/environment';
import { Farmer } from './farmer';
import { World } from '../world/world';
import { ProdutoSimplified } from '../world/models/produto.simplified';
import { BehaviorSubject } from 'rxjs';
import { GameNotification } from '../world/models/game-notification';
import { PostForm } from './postForm';

const API = environment.ApiUrl + '/request/api';
const AGR_ROUTE = '/agricultor';
const MASTER_ROUTE = '/mestre';

@Injectable({
    providedIn: 'root'
})
export class FarmerService{

    private gameNotification = new BehaviorSubject<GameNotification>(null);
    sharedGameNotification = this.gameNotification.asObservable();

    private farmerPostForm = new BehaviorSubject<PostForm>(null);
    sharedPostForm = this.farmerPostForm.asObservable();
    
    constructor(
        private httpClient: HttpClient
    ){ }

    nextGameNotification(newGameNotification: GameNotification) {
        if(newGameNotification != null)
            this.gameNotification.next(newGameNotification);
    }

    nextPostForm(newPostForm: PostForm){
        if(newPostForm != null)
            this.farmerPostForm.next(newPostForm);
    }

    getInfo(idJogo: number, idAgr: number){
        return this.httpClient.get<Farmer>(
            API + '/' + idJogo + AGR_ROUTE + '/' + idAgr
        );
    }

    getInfoMundo(
        idJogo: number
    ){
        return this.httpClient.get<World>(
            API + '/' + idJogo + MASTER_ROUTE + '/infoMundo'
        );
    }

    getProdutosEmpresarios(idJogo: number){
        return this.httpClient.get<ProdutoSimplified[]>(
            API + '/' + idJogo + AGR_ROUTE + '/empresarios/produtos'
        )
    }

    verificaTodosComecaramEtapa(idJogo: number, etapa: number){
        return this.httpClient.get(
            API + '/' + idJogo + MASTER_ROUTE + '/verificaTodosComecaramEtapa/' + etapa
        );
    }

    postAgricultiristForm(
        idJogo: number,
        idAgr: number,
        postForm: PostForm
    ){
        return this.httpClient.post(
            API + '/' + idJogo + AGR_ROUTE + '/' + idAgr,
            postForm
        );
    }

}
