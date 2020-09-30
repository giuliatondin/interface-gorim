import { InvokeFunctionExpr } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, interval } from 'rxjs';
import { flatMap, map } from 'rxjs/operators';

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
                flatMap(() => this.vendaService.getOrcamentos(this.idAgr))
            )
            .subscribe(
                (data: Venda[]) => {
                    this.orcamentos = data;
                    console.log(this.orcamentos);
                }
            );
    }

    apagarOrcamento(orcamento: Venda): Observable<any>{
        return this.vendaService.apagarOrcamento(this.idAgr, orcamento);
    }

    salvarCompra(venda: Venda, resposta: boolean){
        venda.sucesso = resposta;
        this.apagarOrcamento(venda)
            .subscribe(
                () => {
                    console.log("adicionando venda");
                    this.vendaService.adicionaVendaById(venda.idEmp, venda)
                        .subscribe(
                            () => {
                                this.vendaService.getOrcamentos(this.idAgr)
                                    .subscribe(
                                        (data: Venda[]) => {
                                            this.orcamentos = data;
                                            console.log(this.orcamentos);
                                        }
                                    );
                            },
                            err => console.log("Erro subscribe 'venda.component.adicionaVendaById()'" + err)
                        )
                },
                err => console.log(err)
            )
            // .pipe(map(
            //     () => this.vendaService.adicionaVendaById(venda.idEmp, venda),
            //     err => console.log(err)
            // ));
        // this.vendaService.getOrcamentos(this.idAgr)
        //     .subscribe(
        //         (data: Venda[]) => {
        //             this.orcamentos = data;
        //             console.log(this.orcamentos);
        //         }
        //     );
    }
}