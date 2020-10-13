import { Component, OnInit, Input } from '@angular/core';
import { ProdutoSimplified } from '../models/produto.simplified';

@Component({
    selector: 'app-table-values',
    templateUrl: './table-values.component.html',
    styleUrls: ['./table-values.component.scss']
})
export class TableValuesComponent implements OnInit {

    @Input() role: string;
    @Input() produtos: ProdutoSimplified[];

    sementes: ProdutoSimplified[] = [];
    fertilizantes: ProdutoSimplified[] = [];
    maquinas: ProdutoSimplified[] = [];
    agrotoxicos: ProdutoSimplified[] = [];

    constructor() { }

    ngOnInit(): void {
        this.produtos.forEach(
            (prod: ProdutoSimplified) => {
                if(prod.setor == "semente") this.sementes.push(prod)
                else if(prod.setor == "fertilizante") this.fertilizantes.push(prod);
                else if(prod.setor == "maquina") this.maquinas.push(prod);
                else if(prod.setor == "agrotoxico") this.agrotoxicos.push(prod);
            }
        );
    }

}
