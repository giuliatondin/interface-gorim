import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PersonSimplified } from '../models/person.simplified';

const API = environment.ApiUrl;
const MASTER_ROUTE = '/request/api/mestre';

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

    getInfoPessoas(cidade: string){
        return this.httpClient.get<PersonSimplified[]>(
            API + MASTER_ROUTE + '/infoPessoasForVoting/' + cidade
        );
    }

    votar(votos: number[]){
        return this.httpClient.post(
            API + MASTER_ROUTE + '/votar',
            votos
        );
    }

    nextVoto(voto: number[]) {
        this.voto.next(voto);
    }
}