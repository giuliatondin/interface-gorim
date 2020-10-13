import { InvokeFunctionExpr } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, interval } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import { Produto } from 'src/app/world/models/produto';

import { Venda } from './venda';
import { VendaService } from './venda.service';
import { ProdutoService } from '../produto.service';

@Component({
    selector: 'app-vendacard',
    templateUrl: './venda.component.html',
    styleUrls: [ './venda.component.scss' ]
})
export class VendaComponent implements OnInit{
    
    //private quantidadeProdutos: number[];

    comprasForm: FormGroup;
    errorMessage: string;

    orcamentos: Venda[];
    //overPurchases: Venda[];

    @Input() idAgr: number;
    idEmp: number;

    constructor(
        private vendaService: VendaService,
        private produtoService: ProdutoService
    ){
        //
    }

    ngOnInit(){
        //this.quantidadeProdutos = [0, 0, 0, 0];
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

                    // data.forEach(
                    //     prod => {
                    //         this.overPurchases = [];
                    //         this.orcamentos = [];
                    //         let indiceProd = (prod.idEmp < 3) ? (prod.idEmp - 1) : (prod.idProduto == 10) ? 3 : 2;

                    //         if(this.quantidadeProdutos[indiceProd] < 7){
                    //             let qtdTotal = this.quantidadeProdutos[indiceProd] + prod.quantidade;

                    //             if(qtdTotal > 6){
                    //                 // Tirar os a mais e colocar em this.overPurchases
                    //                 // Diminuir prod.quantidade para quantidade que seja possível comprar
                    //             }

                    //             if(prod.quantidade > 0) this.orcamentos.push(prod);
                    //         }
                    //         else{
                    //             console.log("Você não pode comprar esse produto");
                    //             // Logica para aparecer o produto disabled
                    //         }
                    //     }
                    // );

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
                    this.vendaService.adicionaVendaById(venda.idEmp, venda)
                        .subscribe(
                            () => {
                                this.vendaService.getOrcamentos(this.idAgr)
                                    .subscribe(
                                        (data: Venda[]) => {
                                            this.orcamentos = data;
                                        }
                                    );
                            },
                            err => console.log(err)
                        )
                },
                err => console.log(err)
            );
        if (resposta) this.sendProdutoSibilingComponent(venda);
    }

    sendProdutoSibilingComponent(venda: Venda){
        let produto = {
            id: venda.idProduto,
            nome: venda.nomeProduto,
            preco: (venda.preco == "Baixo") ? 0 : (venda.preco == "Alto") ? 2 : 1,
            tipo: venda.idEmp,
            quantidade: venda.quantidade
        };
        this.produtoService.nextProduto(produto as Produto);
    }
}