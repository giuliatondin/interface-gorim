import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TableValuesService } from './table-values.service';

@Component({
    selector: 'app-table-values',
    templateUrl: './table-values.component.html',
    styleUrls: [ './table-values.component.scss' ]
})
export class TableValuesComponent implements OnInit{
    @Input() role: string;
    idJogo;

    classePessoa: number;

    constructor(
        private activatedRoute: ActivatedRoute,
        private tableValuesService: TableValuesService
    ){ }

    ngOnInit(){
        this.idJogo = this.activatedRoute.snapshot.params.idJogo;
        this.classePessoa = this.getClassePessoa();
    }

    getClassePessoa(){
        switch(this.role){
            case 'empresario':
                return 1;
            case 'agricultor':
                return 2;
            case 'fiscalAmbiental':
                return 3;
            case 'prefeito':
                return 4;
            case 'vereador':
                return 5;
            default:
                return 0;
        }
    }
}