import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../alert/alert.service';

import { PersonSimplified } from '../models/person.simplified';
import { Transfer } from './transfer';
import { TransferService } from './transfer.service';

@Component({
    selector: 'app-transfer',
    templateUrl: './transfer.component.html',
    styleUrls: ['./transfer.component.scss']
})
export class TransferComponent implements OnInit {

    @Input() idPessoa: number;
    pessoas: PersonSimplified[];
    
    transferForm: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private transferService: TransferService,
        private alertService: AlertService
    ) { }

    ngOnInit(): void {
        this.transferService.getInfoPessoas()
            .subscribe(
                (data: PersonSimplified[]) => {
                    this.pessoas = data;
                },
                err => console.log(err)
            );
        
        this.transferForm = this.formBuilder.group({
            destinatario: ['', Validators.required],
            quantia: ['', [Validators.required]],
            remetente: [this.idPessoa]
        });
    }

    submitTransferForm(){
        let formData = this.transferForm.getRawValue() as Transfer;
        let aux = formData.quantia.toString();
        if(aux.includes(',')) aux = aux.replace(',', '.');
        formData.quantia = aux as unknown as number;
        this.transferService.postTransfer(formData)
            .subscribe(
                () => {
                    this.alertService.success('Transferencis enviada.');
                    this.transferForm.reset();
                },
                err => {
                    this.alertService.danger('Algo deu errado. Por favor, tente novamente.');
                    console.log(err);
                }
            );
    }

}
