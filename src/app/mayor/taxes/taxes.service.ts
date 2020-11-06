import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Tax } from '../postForm';

@Injectable({
    providedIn: 'root'
})
export class TaxesService {
    
    private taxes = new BehaviorSubject<Tax[]>([{
        tipo: -1,
        taxa: ""
    }]);
    sharedTaxes = this.taxes.asObservable();

    private tipo = new BehaviorSubject<number>(-1);
    sharedTipo = this.tipo.asObservable();

    constructor(){ }

    nextTaxes(taxes: Tax[]) {
        this.taxes.next(taxes);
    }

    nextTroca(tipo: number){
        this.tipo.next(tipo);
    }
}