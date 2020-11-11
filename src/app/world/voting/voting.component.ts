import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatRadioChange } from '@angular/material/radio';
import { Observable } from 'rxjs';
import { AlertService } from '../alert/alert.service';
import { PersonSimplified } from '../models/person.simplified';
import { WebStorageService } from '../web-storage/webstorage.service';
import { VotingService } from './voting.service';

@Component({
    selector: 'app-voting',
    templateUrl: './voting.component.html',
    styleUrls: [ './voting.component.scss' ]
})
export class VotingComponent implements OnInit{

    @Input() cidade: string;
    @Input() idPessoa: number;
    
    candidatosFiscal$: Observable<PersonSimplified[]>;
    candidatosFiscal: PersonSimplified[] = [];
    candidatosPrefeito: PersonSimplified[] = [];
    candidatosVereador: PersonSimplified[] = [];

    votingForm: FormGroup;
    showForm: boolean = true;
    mostraPrefPart: boolean = false;
    mostraVerPart: boolean = false;
    
    votos: number[] = [];

    constructor(
        private votingService: VotingService,
        private alertService: AlertService,
        private webStorageService: WebStorageService,
        private formBuilder: FormBuilder
    ){ }

    ngOnInit(){
        this.candidatosFiscal$ = this.votingService.getInfoPessoas(this.cidade);
        if(this.webStorageService.hasData(this.idPessoa + 'voting')){
            this.showForm = false;
        }
        this.resetForm();
        this.votingService.getInfoPessoas(this.cidade).subscribe(
            (data: PersonSimplified[]) => {
                this.candidatosFiscal = data;
            },
            err => console.log(err)
        );

    }

    resetForm(){
        this.votingForm = this.formBuilder.group({
            fiscalAmbiental: ['', [Validators.required]],
            prefeito: ['', [Validators.required]],
            vereador: ['', [Validators.required]]
        });
        this.mostraPrefPart = false;
        this.mostraVerPart = false;
    }
    
    carregaProximos(event: MatRadioChange, proximo: number){
        let idEscolhido: number = event.value;
        if(proximo == 1){
            while(this.candidatosPrefeito.length > 0) this.candidatosPrefeito.pop();
    
            this.candidatosFiscal.forEach(
                candidato => {
                    if(candidato.id != idEscolhido) this.candidatosPrefeito.push(candidato);
                }
            );
            this.mostraPrefPart = true;
            this.mostraVerPart = false;
        }
        else if(proximo == 2){
            while(this.candidatosVereador.length > 0) this.candidatosVereador.pop();
    
            this.candidatosPrefeito.forEach(
                candidato => {
                    if(candidato.id != idEscolhido) this.candidatosVereador.push(candidato);
                }
            );
            this.mostraVerPart = true;
        }

    }

    votar(){
        console.log(this.votingForm.getRawValue());
        this.votos = [
            this.votingForm.get('fiscalAmbiental').value,
            this.votingForm.get('prefeito').value,
            this.votingForm.get('vereador').value
        ];
        this.votingService.votar(this.votos).subscribe(
            () => {
                this.webStorageService.setData(this.idPessoa + 'voting', this.votos);
                this.showForm = false
                this.alertService.success('Votado com sucesso.');
            },
            err => {
                console.log(err);
                this.alertService.danger('Algo deu errado. Por favor, tente novamente.');
                this.resetForm();
            }
        );
    }
}