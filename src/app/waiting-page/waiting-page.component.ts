import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { interval, Observable, Subscription } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import { World } from '../world/world';
import { WaitingPageService } from './waiting-page.service';

@Component({
    selector: 'app-waiting-page',
    templateUrl: './waiting-page.component.html',
    styleUrls: [ './waiting-page.component.scss' ]
})
export class WaitingPageComponent implements OnInit{
    infoMundo: World;
    idJogo;

    idPessoa: number;
    counter: Observable<number> = interval(10 * 1000);
    subscription: Subscription;

    constructor(
        private waitingPageService: WaitingPageService,
        private activatedRoute: ActivatedRoute,
        private router: Router
    ){ }

    ngOnInit(){
        this.idPessoa = this.activatedRoute.snapshot.params.idPessoa;
        this.idJogo = this.activatedRoute.snapshot.params.idJogo;
        this.waitingPageService.getInfoMundo(this.idJogo)
            .subscribe(
                (data: World) => {
                    this.infoMundo = data;
                    console.log(data);
                    this.verificaFimEtapa();
                },
                err => console.log(err)
            );
    }

    verificaFimEtapa(){
        this.infoMundo.etapa = (this.idPessoa <= this.infoMundo.quantidadeJogadores) ? 1 : 2;
        console.log(this.infoMundo.etapa);
        this.subscription = this.counter
            .pipe(
                flatMap(
                    () => this.waitingPageService.verificaFimEtapa(this.infoMundo.etapa)
                )
            )
            .subscribe(
                (response: number) => {
                    console.log(response);
                    if(response == 0) {
                        this.waitingPageService.getPapelSegundaEtapa(this.idPessoa)
                            .subscribe(
                                (idProximaEtapa: number) => {
                                    if(idProximaEtapa == 0){
                                        this.subscription.unsubscribe();
                                        this.router.navigate([this.idJogo, 'segundaEtapa', this.idPessoa]);
                                    }
                                    else {
                                        let id = Math.floor(idProximaEtapa/10);
                                        let papel = (idProximaEtapa%10 == 0) ? 'fiscalAmbiental' : (idProximaEtapa%10 == 1) ? 'prefeito' : 'vereador';

                                        this.subscription.unsubscribe();
                                        this.router.navigate([this.idJogo, papel, id]);
                                    }
                                }
                            );
                    }
                },
                err => console.log(err)
            );
    }
}