import { InvokeFunctionExpr } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, interval } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Venda } from './venda';
import { VendaService } from './venda.service';

@Component({
    selector: 'app-vendacard',
    templateUrl: './venda.component.html',
    styleUrls: [ './venda.component.scss' ]
})
export class VendaComponent implements OnInit{

    orcamentos: Venda[];

    @Input() idEmp: number;

    constructor(
        private vendaService: VendaService
    ){
        //
    }

    ngOnInit(){
        this.getOrcamentos();
    }

    getOrcamentos(){
        interval(10 * 1000)
            .pipe(
                flatMap(() => this.vendaService.getVendas(this.idEmp))
            )
            .subscribe(
                (data: Venda[]) => {
                    this.orcamentos = data;
                    console.log(this.orcamentos);
                }
            );
    }

    getColour(sucesso: boolean){
        if(sucesso) return 'vendaSucesso';
        else return 'vendaFalha';
    }
}