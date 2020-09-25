import { InvokeFunctionExpr } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { Venda } from './venda';
import { VendaService } from './venda.service';

@Component({
    selector: 'app-vendacard',
    templateUrl: './venda.component.html',
    styleUrls: [ './venda.component.scss' ]
})
export class VendaComponent implements OnInit{
    
    comprasForm: FormGroup;
    errorMessage: string;

    orcamentos: Venda[];

    @Input() idAgr: number;
    idEmp: number;
    sucesso: boolean;
    idProduto: number;
    quantidade: number;
    preco: string;

    constructor(
        private vendaService: VendaService,
        private formBuilder: FormBuilder,
        private activatedRoute: ActivatedRoute
    ){
        //
    }

    ngOnInit(){
        /*this.activatedRoute.params.subscribe(
            params => {
                this.idAgr = params.idAgr;
            }
        )*/
        this.getOrcamentos();

        // idAgr: number;
        // idEmp: number;
        // sucesso: boolean;
        // idProduto: number;
        // quantidade: number;
        // preco: string;

        // this.comprasForm = this.formBuilder.group({
        //     idAgr: [
        //         , [
        //             Validators.required
        //         ]
        //     ],
        //     idEmp: [
        //         , [
        //             Validators.required
        //         ]
        //     ],
        //     idProduto: [
        //         , [
        //             Validators.required
        //         ]
        //     ],
        //     quantidade: [
        //         , [
        //             Validators.required
        //         ]
        //     ],
        //     preco: [
        //         , [
        //             Validators.required
        //         ]
        //     ],
        //     aleatorio: [

        //     ]
        // });
    }

    getOrcamentos(){
        this.vendaService.getOrcamentos(this.idAgr)
        .subscribe(
            (data: Venda[]) => {
                this.orcamentos = data;
                console.log(this.orcamentos);
            }
        );
    }

    comprar(){
        //
    }
}