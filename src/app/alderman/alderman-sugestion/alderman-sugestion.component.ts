import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatRadioChange } from '@angular/material/radio';
import { WebStorageService } from 'src/app/world/web-storage/webstorage.service';
import { Mayor } from 'src/app/mayor/mayor';
import { Tax } from 'src/app/mayor/postForm';
import { AlertService } from 'src/app/world/alert/alert.service';
import { AldermanSugestionService } from './alderman-sugestion.service';
import { AldermanSugestion } from './alderman-sugestion';

@Component({
    selector: 'app-alderman-sugestion',
    templateUrl: './alderman-sugestion.component.html',
    styleUrls: [ './alderman-sugestion.component.scss' ]
})
export class AldermanSugestionComponent implements OnInit {

    @Input() idVer: number;
    idSugestao: number;
    sugestionForm: FormGroup;

    selector: number;
    selectData: string[][] = [];
    radioOptions: string[] = [];

    constructor(
        private sugestionService: AldermanSugestionService,
        private alertService: AlertService,
        private formBuilder: FormBuilder,
        private webStorageService: WebStorageService
    ){ }

    ngOnInit(){
        if(this.webStorageService.hasData('sugestion' + this.idVer + 'idSugestao'))
            this.idSugestao = this.webStorageService.getData('sugestion' + this.idVer + 'idSugestao');
        this.webStorageService.setData('sugestion' + this.idVer + 'idSugestao', this.idSugestao);
        
        this.resetForm();
        this.sugestionService.getInfoPrefeito(this.idVer).subscribe(
            (data: Mayor) => {
                let acoes: string[] = [];
                data.acoesAmbientais.forEach(
                    acao => acoes.push(acao.tipo)
                );
                this.selectData.push(acoes);
                this.selectData.push(['Baixo', 'Médio', 'Alto']);
                this.radioOptions.push('Ações Ambientais');
                let i = 0;
                do {
                    i++;
                    this.radioOptions.push('Taxa ' + i);
                } while(i < data.taxas.length);
            },
            err => console.log(err)
        );
    }

    resetForm(){
        this.selector = -1;
        this.sugestionForm = this.formBuilder.group({
            sugestao: ['', [Validators.required]],
            especificacao: ['', [Validators.required]]
        });
    }

    loadSelectOptions(event: MatRadioChange){
        this.selector = (event.value == '0') ? 0 : 1;
    }

    enviarSugestao(){        
        let newImposto: Tax = {
            tipo: this.sugestionForm.get('sugestao').value as number - 1,
            taxa: (this.selector > 0) ? this.sugestionForm.get('especificacao').value : ""
        };

        let newAcaoAmbiental: string =
            (this.selector == 0) ? this.sugestionForm.get('especificacao').value : '';

        this.sugestionService.postSugestion(
            this.idVer,
            {
                tipoSugestao: this.selector,
                aceito: false,
                idSugestao: this.idSugestao,
                imposto: newImposto,
                acaoAmbiental: newAcaoAmbiental
            } as AldermanSugestion
        ).subscribe(
            () => {
                this.resetForm();
                this.idSugestao++;
                this.webStorageService.setData('sugestion' + this.idVer + 'idSugestao', this.idSugestao);
                this.alertService.success('Sugestão enviada ao Prefeito.');
            },
            err => {
                console.log(err);
                this.alertService.danger('Algo deu errado. Por favor, tente novamente.');
            }
        );
    }

}