import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { interval, Observable, Subscription } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import { WebStorageService } from '../world/web-storage/webstorage.service';
import { World } from '../world/world';

import { AlternativeSecondStagePageService } from './alertnative-second-stage-page.service';

@Component({
    selector: 'app-alertnative-page',
    templateUrl: './alertnative-second-stage-page.component.html',
    styleUrls: [ './alertnative-second-stage-page.component.scss' ]
})
export class AlternativeSecondStagePageComponent implements OnInit {

    idJogo: number;
    idPessoa: number;
    infoPessoaPrimeiraEtapa: string[];

    mundo$: Observable<World>;

    counter: Observable<number> = interval(10 * 1000);
    subscription: Subscription;
    
    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private alternativePageService: AlternativeSecondStagePageService,
        private webStorageService: WebStorageService
    ){ }

    ngOnInit(){
        this.idJogo = this.activatedRoute.snapshot.params.idJogo;
        this.idPessoa = this.activatedRoute.snapshot.params.idPessoa;
        this.infoPessoaPrimeiraEtapa = this.webStorageService.getData(this.idJogo + 'papel');
        this.mundo$ = this.alternativePageService.getInfoMundo(this.idJogo);
        this.verificaFimEtapa();
    }

    verificaFimEtapa(){
        this.subscription = this.counter
            .pipe(
                flatMap(
                    () => this.alternativePageService.verificaFimEtapa(this.idJogo, 2)
                )
            )
            .subscribe(
                (data: number) => {
                    console.log(data);
                    if(data == 0){
                        this.subscription.unsubscribe();
                        this.router.navigate([this.idJogo, this.infoPessoaPrimeiraEtapa[0], this.idPessoa]);
                        // console.log('Indo para ' + this.idJogo + ' agr ou emp ' + this.idPessoa);
                    }
                },
                err => console.log(err)
            );
    }
}