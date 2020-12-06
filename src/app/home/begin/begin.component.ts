import { Component, OnInit/*, ViewChild, ElementRef*/ } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/world/alert/alert.service';

import { BeginService } from './begin.service';

@Component({
    selector: 'app-begin',
    templateUrl: './begin.component.html',
    styleUrls: [ './begin.component.scss' ]
})
export class BeginComponent implements OnInit{

    beginForm: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private beginService: BeginService,
        private route: ActivatedRoute,
        private alertService: AlertService
    ){ }

    ngOnInit(): void {
        this.beginForm = this.formBuilder.group({
            quantidadeJogadores: [
                '', [
                    Validators.required,
                    Validators.min(6)
                ]
            ]
        });
    }

    comecarJogo(){
        if(this.beginForm.valid){
            const quantidadeJogadores: number = this.beginForm.get('quantidadeJogadores').value;
            this.beginService.iniciaJogada(quantidadeJogadores).subscribe(
                (data: number) => {
                    const idJogo = data;
                    if(idJogo > 0) this.router.navigate([idJogo, 'mestre'], { replaceUrl: true });
                    else {
                        this.beginForm.reset();
                        this.alertService.danger('Não foi possível criar um Mundo novo. Por favor, tente novamente.');
                    }
                },
                err => {
                    console.log(err);
                    this.beginForm.reset();
                    this.alertService.danger('Algo deu errado. Por favor, tente novamente.');
                }
            );
        }
    }
}