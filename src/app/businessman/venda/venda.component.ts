import { Component, Input, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import { Venda } from 'src/app/farmer/venda/venda';
import { AlertService } from 'src/app/world/alert/alert.service';

import { VendaService } from './venda.service';

@Component({
    selector: 'app-vendacard',
    templateUrl: './venda.component.html',
    styleUrls: [ './venda.component.scss' ]
})
export class VendaComponent implements OnInit{
    
    @Input() idJogo: number;
    @Input() idEmp: number;

    quantidadeOrcamentos: number = 0;
    orcamentos: Venda[] = [];

    constructor(
        private vendaService: VendaService,
        private alertService: AlertService
    ){
        //
    }

    ngOnInit(){
        this.getOrcamentos();
    }

    getOrcamentos(){
        interval(10 * 1000)
            .pipe(
                flatMap(() => this.vendaService.getVendas(this.idJogo, this.idEmp))
            )
            .subscribe(
                (data: Venda[]) => {
                    if(data != null){
                        if(this.quantidadeOrcamentos < data.length){
                            this.quantidadeOrcamentos = data.length;
                            this.alertService.info('Você tem novas respostas de agricultores');
                        }
                        this.orcamentos = data;
                    }
                }
            );
    }

    getColour(sucesso: boolean){
        if(sucesso) return 'vendaSucesso';
        else return 'vendaFalha';
    }
}