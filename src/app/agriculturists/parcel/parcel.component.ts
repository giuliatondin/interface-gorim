import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatRadioChange } from '@angular/material/radio';
import { Produto } from 'src/app/world/models/produto';
import { ProdutoService } from '../produto.service';

@Component({
    selector: 'app-parcel',
    templateUrl: './parcel.component.html',
    styleUrls: ['./parcel.component.scss']
})
export class ParcelComponent implements OnInit {

    parcelasForm: FormGroup;

    quantidades = [
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
    nomesProdutos = new Array<string>(13);

    checkedButtons = [
        [0, 0, 0, 0], // p1
        [0, 0, 0, 0], // p2
        [0, 0, 0, 0], // p3
        [0, 0, 0, 0]  // p4
    ];

    constructor(
        private produtoService: ProdutoService,
        private formBuilder: FormBuilder
    ) { }

    ngOnInit(): void {
        this.produtoService.sharedProdutos.subscribe(
            (produto: Produto) => {
                if(produto.nome != ""){
                    this.quantidades[produto.id-1][produto.preco] += produto.quantidade;
                    this.nomesProdutos[produto.id-1] = produto.nome;
                }
            },
            err => console.log(err)
        )

        this.parcelasForm = this.formBuilder.group({
            parcelaUm: this.formBuilder.group({
                sementeP1: ['none', Validators.required],
                fertilizanteP1: ['none', Validators.required],
                maquinaP1: ['none', Validators.required],
                agrotoxicoP1: ['none', Validators.required]
            }),
            parcelaDois: this.formBuilder.group({
                sementeP2: ['none', Validators.required],
                fertilizanteP2: ['none', Validators.required],
                maquinaP2: ['none', Validators.required],
                agrotoxicoP2: ['none', Validators.required]
            }),
            parcelaTres: this.formBuilder.group({
                sementeP3: ['none', Validators.required],
                fertilizanteP3: ['none', Validators.required],
                maquinaP3: ['none', Validators.required],
                agrotoxicoP3: ['none', Validators.required]
            }),
            parcelaQuatro: this.formBuilder.group({
                sementeP4: ['none', Validators.required],
                fertilizanteP4: ['none', Validators.required],
                maquinaP4: ['none', Validators.required],
                agrotoxicoP4: ['none', Validators.required]
            }),
            parcelaCinco: this.formBuilder.group({
                sementeP5: ['none', Validators.required],
                fertilizanteP5: ['none', Validators.required],
                maquinaP5: ['none', Validators.required],
                agrotoxicoP5: ['none', Validators.required]
            }),
            parcelaSeis: this.formBuilder.group({
                sementeP6: ['none', Validators.required],
                fertilizanteP6: ['none', Validators.required],
                maquinaP6: ['none', Validators.required],
                agrotoxicoP6: ['none', Validators.required]
            }),
        });
    }

    contaQuantidade(parcela: number, tipo: number, event: MatRadioChange){
        
        if(this.checkedButtons[parcela-1][tipo-1] != 0) {
            let idProdAntigo, precoAntigo;
            precoAntigo = this.checkedButtons[parcela-1][tipo-1]%10;
            idProdAntigo = Math.floor(this.checkedButtons[parcela-1][tipo-1]/10);

            this.checkedButtons[parcela-1][tipo-1] = 0;
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

            this.checkedButtons[parcela-1][tipo-1] = aux;
        }
    }

}
