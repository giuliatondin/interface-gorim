import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-vendacard',
    templateUrl: './venda.component.html',
    styleUrls: [ './venda.component.scss' ]
})
export class VendaComponent implements OnInit{
    @Input() sucesso: boolean;
    @Input() idProduto: number;
    @Input() quantidade: number;
    @Input() preco: string;

    constructor(){
        //
    }

    ngOnInit(){
        //
    }
}