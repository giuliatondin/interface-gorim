import { Component, Input, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import { Venda } from 'src/app/agriculturist/venda/venda';

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
                }
            );
    }

    getColour(sucesso: boolean){
        if(sucesso) return 'vendaSucesso';
        else return 'vendaFalha';
    }
}