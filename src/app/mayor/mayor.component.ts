import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { interval, Observable, Subscription } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import { WebStorageService } from '../agriculturist/webstorage.service';
import { AlertService } from '../world/alert/alert.service';
import { World } from '../world/world';
import { EnvironmentalActionService } from './environmental-action/environmental-action.service';
import { Mayor } from './mayor';
import { MayorService } from './mayor.service';
import { PostForm, Tax } from './postForm';
import { TaxesService } from './taxes/taxes.service';

@Component({
    selector: 'app-mayor',
    templateUrl: './mayor.component.html',
    styleUrls: [ './mayor.component.scss' ]
})
export class MayorComponent implements OnInit {
    
    idPref: number;
    idJogo;

    infoPref: Mayor;
    infoMundo$: Observable<World>;

    environmentalActions: number[] = [];
    taxes: Tax[] = [];

    liberaBotao: boolean = false;

    counter: Observable<number> = interval(10 * 1000);
    subscription: Subscription;

    constructor(
        private prefService: MayorService,
        private activatedRoute: ActivatedRoute,
        private webStorageService: WebStorageService,
        private alertService: AlertService,
        private environmentalActService: EnvironmentalActionService,
        private taxesService: TaxesService,
        private router: Router
    ){ }

    ngOnInit(){
        this.idPref = this.activatedRoute.snapshot.params.idPref;
        this.idJogo = this.activatedRoute.snapshot.params.idJogo;

        this.infoMundo$ = this.prefService.getInfoMundo(this.idJogo);

        this.prefService.getInfo(this.idPref).subscribe(
            (data: Mayor) => this.infoPref = data,
            err => console.log(err)
        );

        if(this.webStorageService.hasData('pref'+ this.idPref + 'environmentalActions'))
            this.environmentalActions = this.webStorageService.getData('pref'+ this.idPref + 'environmentalActions') as number[];
        this.webStorageService.setData('pref'+ this.idPref + 'environmentalActions', this.environmentalActions);

        this.environmentalActService.sharedEnvironmentalAction.subscribe(
            (data: number) => {
                if(data > -1){
                    this.environmentalActions.push(data);
                    this.webStorageService.setData('pref'+ this.idPref + 'environmentalActions', this.environmentalActions);
                }
            },
            err => console.log(err)
        );

        if(this.webStorageService.hasData('pref'+ this.idPref + 'taxes'))
            this.taxes = this.webStorageService.getData('pref'+ this.idPref + 'taxes') as Tax[];
        this.webStorageService.setData('pref'+ this.idPref + 'taxes', this.taxes);

        this.taxesService.sharedTaxes.subscribe(
            (taxes: Tax[]) => {
                taxes.forEach(
                    (data: Tax) =>{
                        if(data.tipo > -1){
                            this.taxes.push(data);
                            this.webStorageService.setData('pref'+ this.idPref + 'taxes', this.taxes);
                        }
                    }
                );
            },
            err => console.log(err)
        );

        this.verificaFimEtapa();
    }

    removeAction(acao: number){
        this.environmentalActions.splice(this.environmentalActions.indexOf(acao), 1);
        this.alertService.success("Removido.");
        this.environmentalActService.nextTroca(acao);
        this.webStorageService.setData('pref'+ this.idPref + 'environmentalActions', this.environmentalActions);
    }

    removeTax(tax: Tax){
        this.taxes.splice(this.taxes.indexOf(tax), 1);
        this.alertService.success("Removido.");
        this.taxesService.nextTroca(tax.tipo);
        this.webStorageService.setData('pref'+ this.idPref + 'taxes', this.taxes);
    }

    verificaFimEtapa(){
        this.subscription = this.counter
            .pipe(
                flatMap(
                    () => this.prefService.verificaFimEtapa(2)
                )
            )
            .subscribe(
                (data: number) => {
                    console.log(data);
                    if(data > 2) this.liberaBotao = true;
                    else if(data == 0){
                        this.subscription.unsubscribe();
                        this.finalizarJogada(true);
                    }
                },
                err => console.log(err)
            );
    }

    finalizarJogada(finishedByMaster: boolean = false){
        this.prefService.finalizaJogada(
            this.idPref,
            {
                impostos: this.taxes,
                idAcoesAmbientais: this.environmentalActions
            } as PostForm
            )
            .subscribe(
                () => {
                    this.subscription.unsubscribe();
                    if(finishedByMaster) this.alertService.warning('Jogada finalizada pelo Mestre.', true);
                    else this.alertService.success('Jogada finalizada.', true);
                    this.router.navigate([this.idJogo, 'waitingPage', this.idPref]);
                },
                err => {
                    console.log(err);
                    this.alertService.danger('Algo deu errado. Por favor, tente novamente.');
                }
            );
    }
}