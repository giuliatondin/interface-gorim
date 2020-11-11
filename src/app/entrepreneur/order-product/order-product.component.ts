import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrderProductService } from './order-product.service';
import { PersonSimplified } from 'src/app/world/models/person.simplified';
import { AlertService } from 'src/app/world/alert/alert.service';
import { WebStorageService } from 'src/app/world/web-storage/webstorage.service';
import { Venda } from 'src/app/agriculturist/venda/venda';

@Component({
    selector: 'app-order-product',
    templateUrl: './order-product.component.html',
    styleUrls: ['./order-product.component.scss']
})
export class OrderProductComponent implements OnInit {

    orcamentoForm: FormGroup;
    idOrcamento: number;

    @Input() idEmp: number;
    @Input() produtos: string[];
    @Input() nomeAgricultores: PersonSimplified[];

    constructor(
        private formBuilder: FormBuilder,
        private orderProductService: OrderProductService,
        private alertService: AlertService,
        private webStorageService: WebStorageService
    ) {
        this.idOrcamento = 0;
    }

    ngOnInit(): void {
        this.resetForm();
        if(this.webStorageService.hasData('orderProduct' + this.idEmp + 'idOrcamento'))
            this.idOrcamento = this.webStorageService.getData('orderProduct' + this.idEmp + 'idOrcamento');
        this.webStorageService.setData('orderProduct' + this.idEmp + 'idOrcamento', this.idOrcamento);
        console.log(this.produtos);
    }

    resetForm(){
        this.orcamentoForm = this.formBuilder.group({
            idAgr: [
                '', [
                    Validators.required
                ]
            ],
            idEmp: [
                this.idEmp
            ],
            sucesso: [
                false
            ],
            idProduto: [
                '', [
                    Validators.required
                ]
            ],
            quantidade: [
                '', [
                    Validators.required,
                    Validators.max(6),
                    Validators.min(1)
                ]
            ],
            preco: [
                '', [
                    Validators.required
                ]
            ]
        });
    }

    adicionarOrcamento(){

        this.orderProductService
            .adicionarOrcamento(
                this.idOrcamento,
                this.orcamentoForm.get('idAgr').value,
                this.orcamentoForm.getRawValue() as Venda
            )
            .subscribe(
                () => {
                    this.orcamentoForm.reset();
                    this.resetForm();
                    this.alertService.success('Orçamento enviado para o agricultor.');
                    this.idOrcamento++;
                },
                err => {
                    console.log(err);
                    this.orcamentoForm.reset();
                    this.alertService.danger('Algo deu errado. Por favor, tente novamente.');
                }
            );

    }

}
