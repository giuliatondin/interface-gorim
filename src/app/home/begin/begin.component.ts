import { Component, OnInit/*, ViewChild, ElementRef*/ } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { BeginService } from './begin.service';

@Component({
    selector: 'app-begin',
    templateUrl: './begin.component.html',
    styleUrls: [ './begin.component.scss' ]
})
export class BeginComponent implements OnInit{

    beginForm: FormGroup;
    //@ViewChild('quantidadeJogadores') quantidadeJogadoresInput: ElementRef<HTMLInputElement>;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private beginService: BeginService
    ){
        //
    }

    ngOnInit(): void {
        this.beginForm = this.formBuilder.group({
            quantidadeJogadores: [
                '', [
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
                () => this.router.navigate(['mestre']),
                err => {
                    console.log(err);
                    this.beginForm.reset();
                    alert("Something went wrong. Please, try again.")
                }
            )
    }
}