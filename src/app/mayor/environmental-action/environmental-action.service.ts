import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class EnvironmentalActionService {
    
    private environmentalAction = new BehaviorSubject<number>(-1);
    sharedEnvironmentalAction = this.environmentalAction.asObservable();

    private troca = new BehaviorSubject<number>(-1);
    sharedTroca = this.troca.asObservable();

    constructor(){ }

    nextEnvironmentalAction(environmentalAction: number) {
        this.environmentalAction.next(environmentalAction);
    }

    nextTroca(troca: number){
        this.troca.next(troca);
    }
}