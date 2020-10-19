import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatRadioChange } from '@angular/material/radio';

import { Produto } from 'src/app/world/models/produto';
import { ProdutoSimplified } from 'src/app/world/models/produto.simplified';
import { ProdutoService } from '../produto.service';
import { WebStorageService } from '../webstorage.service';

@Component({
    selector: 'app-parcel',
    templateUrl: './parcel.component.html',
    styleUrls: ['./parcel.component.scss']
})
export class ParcelComponent implements OnInit {

    parcelasForm: FormGroup;

    quantidades = [];
    @Input() produtos: ProdutoSimplified[];

    checkedButtons = [];

    constructor(
        private produtoService: ProdutoService,
        private formBuilder: FormBuilder,
        private webStorageService: WebStorageService
    ) { }

    ngOnInit(): void {

        this.iniciaArrays();

        this.produtoService.sharedProdutos.subscribe(
            (produto: Produto) => {
                if(produto.nome != ""){
                    this.quantidades[produto.id-1][produto.preco] += produto.quantidade;
                    this.webStorageService.setData('parcelQuantidades', this.quantidades);
                }
            },
            err => console.log(err)
        )

        this.parcelasForm = this.formBuilder.group({
            seloVerde: [false, Validators.required],
            parcelaUm: this.formBuilder.group({
                sementeP1: ['none', Validators.required],
                fertilizanteP1: ['none', Validators.required],
                maquinaP1: ['none', Validators.required],
                pulverizadorP1: ['none', Validators.required],
                agrotoxicoP1: ['none', Validators.required]
            }),
            parcelaDois: this.formBuilder.group({
                sementeP2: ['none', Validators.required],
                fertilizanteP2: ['none', Validators.required],
                maquinaP2: ['none', Validators.required],
                pulverizadorP2: ['none', Validators.required],
                agrotoxicoP2: ['none', Validators.required]
            }),
            parcelaTres: this.formBuilder.group({
                sementeP3: ['none', Validators.required],
                fertilizanteP3: ['none', Validators.required],
                maquinaP3: ['none', Validators.required],
                pulverizadorP3: ['none', Validators.required],
                agrotoxicoP3: ['none', Validators.required]
            }),
            parcelaQuatro: this.formBuilder.group({
                sementeP4: ['none', Validators.required],
                fertilizanteP4: ['none', Validators.required],
                maquinaP4: ['none', Validators.required],
                pulverizadorP4: ['none', Validators.required],
                agrotoxicoP4: ['none', Validators.required]
            }),
            parcelaCinco: this.formBuilder.group({
                sementeP5: ['none', Validators.required],
                fertilizanteP5: ['none', Validators.required],
                maquinaP5: ['none', Validators.required],
                pulverizadorP5: ['none', Validators.required],
                agrotoxicoP5: ['none', Validators.required]
            }),
            parcelaSeis: this.formBuilder.group({
                sementeP6: ['none', Validators.required],
                fertilizanteP6: ['none', Validators.required],
                maquinaP6: ['none', Validators.required],
                pulverizadorP6: ['none', Validators.required],
                agrotoxicoP6: ['none', Validators.required]
            }),
        });
    }

    iniciaArrays(){
        this.quantidades = (this.webStorageService.hasData('parcelQuantidades')) ?
            this.webStorageService.getData('parcelQuantidades') :
            [
                //  [b, m, a]
                    [0, 0, 0], // hortalica
                    [0, 0, 0], // arroz
                    [0, 0, 0], // soja
                    [0, 0, 0], // f comum
                    [0, 0, 0], // f premium
                    [0, 0, 0], // f super premium
                    [0, 0, 0], // pacote 1
                    [0, 0, 0], // pacote 2
                    [0, 0, 0], // pacote 3
                    [0, 0, 0], // pulverizador
                    [0, 0, 0], // a comum
                    [0, 0, 0], // a premium
                    [0, 0, 0]  // a super premium
            ];
        
        this.checkedButtons = (this.webStorageService.hasData('parcelCheckedButtons')) ?
            this.webStorageService.getData('parcelCheckedButtons') :
            [
                [0, 0, 0, 0], // p1
                [0, 0, 0, 0], // p2
                [0, 0, 0, 0], // p3
                [0, 0, 0, 0], // p4
                [0, 0, 0, 0], // p5
                [0, 0, 0, 0]  // p6
            ];
        
        this.webStorageService.setData('parcelCheckedButtons', this.checkedButtons);
        this.webStorageService.setData('parcelQuantidades', this.quantidades);
    }

    getIndiceProduto(idEmp: number, idProduto: number){
        if(idEmp < 3) return (idEmp - 1)
        else if(idProduto == 10) return 3
        else return 2;
    }

    contaQuantidade(parcela: number, indice: number, event: MatRadioChange){
        if(this.checkedButtons[parcela-1][indice] != 0) {
            let idProdAntigo, precoAntigo;
            precoAntigo = this.checkedButtons[parcela-1][indice]%10;
            idProdAntigo = Math.floor(this.checkedButtons[parcela-1][indice]/10);

            this.checkedButtons[parcela-1][indice] = 0;
            this.quantidades[idProdAntigo-1][precoAntigo]++;
        }

        if(event.value != "none"){
            const idProd = event.value;
    
            let aux = idProd*10;
            let preco;
            
            if(this.quantidades[idProd-1][0] != 0) preco = 0;
            else if(this.quantidades[idProd-1][1] != 0) preco = 1;
            else if(this.quantidades[idProd-1][2] != 0) preco = 2;

            this.quantidades[idProd-1][preco]--;
            aux += preco;

            this.checkedButtons[parcela-1][indice] = aux;
        }

        this.webStorageService.setData('parcelCheckedButtons', this.checkedButtons);
        this.webStorageService.setData('parcelQuantidades', this.quantidades);
    }

    contaQuantidadePulverizador(parcela: number, event: MatCheckboxChange){
        //[checked]="(quantidades[9][0] + quantidades[9][1] + quantidades[9][2] == 0)"
        if((this.quantidades[9][0] + this.quantidades[9][1] + this.quantidades[9][2]) == 0)
            this.parcelasForm.get('parcelaUm').get('pulverizadorP1').get;

        else
        if(event.checked){
            const idProd = +event.source.value;
    
            let aux = idProd*10;
            let preco;
            
            if(this.quantidades[idProd-1][0] != 0) preco = 0;
            else if(this.quantidades[idProd-1][1] != 0) preco = 1;
            else if(this.quantidades[idProd-1][2] != 0) preco = 2;

            this.quantidades[idProd-1][preco]--;
            aux += preco;

            this.checkedButtons[parcela-1][3] = aux;
        }
        else{
            let idProdAntigo, precoAntigo;
            precoAntigo = this.checkedButtons[parcela-1][3]%10;
            idProdAntigo = Math.floor(this.checkedButtons[parcela-1][3]/10);

            this.checkedButtons[parcela-1][3] = 0;
            this.quantidades[idProdAntigo-1][precoAntigo]++;
        }

        this.webStorageService.setData('parcelCheckedButtons', this.checkedButtons);
        this.webStorageService.setData('parcelQuantidades', this.quantidades);
    }

    finalizarJogada(){
        let values = this.parcelasForm.getRawValue();
        console.log(values);
    }
}
