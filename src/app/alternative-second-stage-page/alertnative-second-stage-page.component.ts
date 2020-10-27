import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { interval } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { AlternativeSecondStagePageService } from './alertnative-second-stage-page.service';

@Component({
    selector: 'app-alertnative-page',
    templateUrl: './alertnative-second-stage-page.component.html',
    styleUrls: [ './alertnative-second-stage-page.component.scss' ]
})
export class AlternativeSecondStagePageComponent implements OnInit {

    idJogo;
    idPessoa: number;
    
    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private alternativePageService: AlternativeSecondStagePageService
    ){ }

    ngOnInit(){
        this.idJogo = this.activatedRoute.snapshot.params.idJogo;
        this.idPessoa = this.activatedRoute.snapshot.params.idPessoa;
    }

    verificaFimEtapa(){
        interval(10 * 1000)
            .pipe(
                flatMap(
                    () => this.alternativePageService.verificaFimEtapa(2)
                )
            )
            .subscribe(
                (data: number) => {
                    console.log(data);
                    if(data == 0){
                        //this.router.navigate([this.idJogo, 'segundaEtapa', this.idPessoa]);
                        console.log('Indo para ' + this.idJogo + ' agr ou emp ' + this.idPessoa);
                    }
                },
                err => console.log(err)
            );
    }
}