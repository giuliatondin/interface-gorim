import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Venda } from 'src/app/entrepreneurs/venda/venda';
import { VendaComponent } from 'src/app/agriculturists/venda/venda.component';
import { OrderProductService } from './order-product.service';
import { AgriculturistSimplified } from 'src/app/agriculturists/agriculturist/agriculturist.simplified';
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
    @Input() nomeAgricultores: AgriculturistSimplified[];

    constructor(
        private formBuilder: FormBuilder,
        private orderProductService: OrderProductService
    ) {
        this.idOrcamento = 0;
    }

    ngOnInit(): void {
        this.resetForm();
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
            nomeProduto: [
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
            ],
            idJava: [
                0
            ]
        });
    }

    adicionarOrcamento(){

        console.log(this.orcamentoForm.get("idEmp").value);

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
                    alert("FEITOOOOOOO!!");
                    this.idOrcamento++;
                },
                err => {
                    console.log(err);
                    this.orcamentoForm.reset();
                    alert("Something went wrong. Please, try again.");
                }
            )

    }

}
