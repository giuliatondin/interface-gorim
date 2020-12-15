import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, interval } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import { Produto } from 'src/app/world/models/produto';

import { Venda } from './venda';
import { VendaService } from './venda.service';
import { ProdutoService } from '../produto.service';
import { WebStorageService } from '../../world/web-storage/webstorage.service';
import { AlertService } from 'src/app/world/alert/alert.service';

@Component({
    selector: 'app-vendacard',
    templateUrl: './venda.component.html',
    styleUrls: [ './venda.component.scss' ]
})
export class VendaComponent implements OnInit{

    @Input() idJogo: number;
    @Input() idAgr: number;
    @Input() quantidadeJogadores: number;

    idEmp: number;
    
    private quantidadeProdutos: number[];

    comprasForm: FormGroup;

    orcamentos: Venda[] = [];
    overPurchases: Venda[] = [];
    quantidadeOrcamentos: number = 0;

    constructor(
        private vendaService: VendaService,
        private produtoService: ProdutoService,
        private webStorageService: WebStorageService,
        private alertService: AlertService
    ){
        //
    }

    ngOnInit(){
        console.log(this.webStorageService.hasData('agr'+ this.idAgr + 'VendaQuantidadeProdutos'));
        
        this.quantidadeProdutos = (this.webStorageService.hasData('agr'+ this.idAgr + 'VendaQuantidadeProdutos')) ?
            this.webStorageService.getData('agr'+ this.idAgr + 'VendaQuantidadeProdutos') as number[] :
            [0, 0, 0, 0];
        this.webStorageService.setData('agr'+ this.idAgr + 'VendaQuantidadeProdutos', this.quantidadeProdutos);

        this.getOrcamentos();
    }

    getIndiceProduto(idEmp: number, idProduto: number){
        if(idEmp < 3) return (idEmp - 1)
        else if(idProduto == 10) return 3
        else return 2;
    }

    arrumaOverPurchases(data: Venda[]){
        this.overPurchases = [];
        this.orcamentos = [];

        data.forEach(
            orc => {
                // Descobrir o tipo do produto
                let indiceProduto = this.getIndiceProduto(orc.idEmp, orc.idProduto);

                // Ver quantidade ja comprada do produto
                let quantidadeJaComprada = this.quantidadeProdutos[indiceProduto];

                // Ver se 0 > orc.quantidade || orc.quantidade > (6-qntd)
                if(orc.quantidade < 0) this.vendaService.apagarOrcamento(this.idJogo, this.idAgr, orc);

                else if(orc.idOrcamento > (this.quantidadeJogadores*100-1)) this.overPurchases.push(orc);

                else if (orc.quantidade > (6 - quantidadeJaComprada)){
                    // Se sim
                        // Separar para quantidade comprável (orcamentoDivididoCompravel e orcamentoDivididoNaoCompravel)
                        let quantidadePossivel = 6 - quantidadeJaComprada;
                        
                        let orcamentoDivididoNaoCompravel: Venda = {
                            nomeAgr: orc.nomeAgr,
                            idAgr: orc.idAgr,
                            nomeEmp: orc.nomeEmp,
                            idEmp: orc.idEmp,
                            nomeProduto: orc.nomeProduto,
                            idProduto: orc.idProduto,
                            sucesso: orc.sucesso,
                            idOrcamento: (orc.idOrcamento + (this.quantidadeJogadores*100)),
                            preco: orc.preco,
                            quantidade: (orc.quantidade - quantidadePossivel)
                        };

                        // Remover orc de data
                        this.vendaService.apagarOrcamento(this.idJogo, this.idAgr, orc)
                            .subscribe(
                                () => {
                                    this.overPurchases.push(orcamentoDivididoNaoCompravel);
                                    this.vendaService.adicionaOverOrcamento(this.idJogo, this.idAgr, orcamentoDivididoNaoCompravel)
                                        .subscribe(
                                            () => {
                                                // if(quantidadePossivel > 0) this.orcamentos(orcamentoDivididoCompravel)
                                                if(quantidadePossivel > 0){
                                                    let orcamentoDivididoCompravel: Venda = {
                                                        nomeAgr: orc.nomeAgr,
                                                        idAgr: orc.idAgr,
                                                        nomeEmp: orc.nomeEmp,
                                                        idEmp: orc.idEmp,
                                                        nomeProduto: orc.nomeProduto,
                                                        idProduto: orc.idProduto,
                                                        sucesso: orc.sucesso,
                                                        idOrcamento: orc.idOrcamento,
                                                        preco: orc.preco,
                                                        quantidade: quantidadePossivel
                                                    };
                                                    this.vendaService.adicionaOverOrcamento(this.idJogo, this.idAgr, orcamentoDivididoCompravel)
                                                        .subscribe(
                                                            () => 
                                                            this.orcamentos.push(orcamentoDivididoCompravel),
                                                            err => console.log(err)
                                                        )
                                                }
                                                // this.overPurchases(orcamentoDivididoNaoCompravel)
                                            },
                                            err => console.log(err)
                                        );
                                    
                                },
                                err => console.log(err)
                            )

                        
                }
                else{
                    // Se não, this.orcamentos(orc)
                    this.orcamentos.push(orc);
                }
            }
        );
    }

    getOrcamentos(){
        interval(10 * 1000)
            .pipe(
                flatMap(() => this.vendaService.getOrcamentos(this.idJogo, this.idAgr))
            )
            .subscribe(
                (data: Venda[]) => {
                    if(this.quantidadeOrcamentos < data.length){
                        this.quantidadeOrcamentos = data.length;
                        this.alertService.info('Você tem novos orçamentos');
                    }
                    this.arrumaOverPurchases(data);
                }
            );
    }

    apagarOrcamento(orcamento: Venda): Observable<any>{
        this.quantidadeOrcamentos--;
        return this.vendaService.apagarOrcamento(this.idJogo, this.idAgr, orcamento);
    }

    salvarCompra(venda: Venda, resposta: boolean){
        venda.sucesso = resposta;
        this.apagarOrcamento(venda)
            .subscribe(
                () => {
                    this.vendaService.adicionaVendaById(this.idJogo, venda.idEmp, venda)
                        .subscribe(
                            () => {
                                if(venda.sucesso){
                                    this.quantidadeProdutos[this.getIndiceProduto(venda.idEmp, venda.idProduto)] += venda.quantidade;
                                    this.webStorageService.setData('agr'+ this.idAgr + 'VendaQuantidadeProdutos', this.quantidadeProdutos);
                                    this.alertService.success('Produto comprado.');
                                }
                                else this.alertService.warning('Produto cancelado.');
                                this.vendaService.getOrcamentos(this.idJogo, this.idAgr)
                                    .subscribe(
                                        (data: Venda[]) => {
                                            this.arrumaOverPurchases(data);
                                        }
                                    );
                            },
                            err => {
                                this.alertService.danger('Algo deu errado. Por favor, tente novamente.');
                                console.log(err);
                            }
                        )
                },
                err => {
                    this.alertService.danger('Algo deu errado. Por favor, tente novamente.');
                    console.log(err);
                }
            );
        if (resposta) this.sendProdutoSibilingComponent(venda);
    }

    sendProdutoSibilingComponent(venda: Venda){
        this.produtoService.nextProduto({
            id: venda.idProduto,
            nome: venda.nomeProduto,
            preco: (venda.preco == "Baixo") ? 0 : (venda.preco == "Alto") ? 2 : 1,
            tipo: venda.idEmp,
            quantidade: venda.quantidade
        } as Produto);
    }
}