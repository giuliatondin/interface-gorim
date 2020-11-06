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
                    Validators.max(16),
                    Validators.min(6)
                ]
            ]
        });
    }

    comecarJogo(){
        const quantidadeJogadores: number = this.beginForm.get('quantidadeJogadores').value;
        this.beginService
            .iniciaJogada(quantidadeJogadores)
            .subscribe(
                () => {
                    const idJogo = 1;
                    // get idJogo
                    this.router.navigate([idJogo, 'mestre'], { replaceUrl: true });
                },
                err => {
                    console.log(err);
                    this.beginForm.reset();
                    this.alertService.danger('Algo deu errado. Por favor, tente novamente.');
                }
            )
    }
}