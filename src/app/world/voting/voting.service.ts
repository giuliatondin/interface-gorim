import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PersonSimplified } from '../models/person.simplified';

const API = environment.ApiUrl + '/request/api';
const MASTER_ROUTE = '/mestre';

@Injectable({
    providedIn: 'root'
})
export class VotingService {
    
    private voto = new BehaviorSubject<number[]>([-1]);
    sharedVoto = this.voto.asObservable();
    
    constructor(
        private httpClient: HttpClient
    ){
        //
    }

    getInfoPessoas(idJogo: number, cidade: string){
        return this.httpClient.get<PersonSimplified[]>(
            API + '/' + idJogo + MASTER_ROUTE + '/infoPessoasForVoting/' + cidade
        );
    }

    votar(idJogo: number, votos: number[]){
        return this.httpClient.post(
            API + '/' + idJogo + MASTER_ROUTE + '/votar',
            votos
        );
    }

    nextVoto(voto: number[]) {
        this.voto.next(voto);
    }
}