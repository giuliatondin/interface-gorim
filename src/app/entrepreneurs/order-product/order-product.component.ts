import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Venda } from 'src/app/entrepreneurs/venda/venda';
import { VendaComponent } from 'src/app/agriculturists/venda/venda.component';
import { OrderProductService } from './order-product.service';
@Component({
    selector: 'app-order-product',
    templateUrl: './order-product.component.html',
    styleUrls: ['./order-product.component.scss']
})
export class OrderProductComponent implements OnInit {

    orcamentoForm: FormGroup;
    @Input() idEmp: number;

    constructor(
        private formBuilder: FormBuilder,
        private orderProductService: OrderProductService
    ) { }

    ngOnInit(): void {
        this.resetForm();
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
                this.orcamentoForm.get('idAgr').value,
                this.orcamentoForm.getRawValue() as Venda
            )
            .subscribe(
                () => {
                    this.orcamentoForm.reset();
                    this.resetForm();
                    alert("FEITOOOOOOO!!");
                },
                err => {
                    console.log(err);
                    this.orcamentoForm.reset();
                    alert("Something went wrong. Please, try again.");
                }
            )

    }

}
