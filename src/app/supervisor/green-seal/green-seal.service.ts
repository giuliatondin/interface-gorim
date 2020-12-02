import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PersonSimplified } from 'src/app/world/models/person.simplified';
import { environment } from 'src/environments/environment';
import { GreenSeal } from '../postForm';

const API = environment.ApiUrl;
const MASTER_ROUTE = '/request/api/mestre';

@Injectable({
    providedIn: 'root'
})
export class GreenSealService {
    
    private greenSeal = new BehaviorSubject<GreenSeal>({
        idAgr: 0,
        parcelas: [],
        atribuir: false
    });
    sharedGreenSeals = this.greenSeal.asObservable();

    constructor(
        private httpClient: HttpClient
    ){ }

    nextGreenSeal(greenSeal: GreenSeal) {
        this.greenSeal.next(greenSeal);
    }

    getInfoAgricultores(cidade: string){
        return this.httpClient.get<PersonSimplified[]>(
            API + MASTER_ROUTE + '/infoPessoasForGreenSeal/' + cidade
        );
    }
}