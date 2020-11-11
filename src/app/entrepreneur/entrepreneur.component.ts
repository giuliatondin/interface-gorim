import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { interval, Observable, Subscription } from 'rxjs';

import { World } from 'src/app/world/world';
import { EntrepreunersService } from './entrepreneur.service';
import { PersonSimplified } from '../world/models/person.simplified';
import { Entrepreneur } from './entrepreneur';
import { ProdutoSimplified } from 'src/app/world/models/produto.simplified';
import { flatMap } from 'rxjs/operators';
import { AlertService } from 'src/app/world/alert/alert.service';
import { WebStorageService } from '../world/web-storage/webstorage.service';

@Component({
    selector: 'app-entrepreneur',
    templateUrl: './entrepreneur.component.html',
    styleUrls: ['./entrepreneur.component.scss']
})
export class EntrepreneurComponent implements OnInit {

    infoEmp$: Observable<Entrepreneur>;
    idEmp: number;
    emp: Entrepreneur;

    infoMundo$: Observable<World>;
    idJogo: number;

    nomeAgricultores: PersonSimplified[];
    produtos: ProdutoSimplified[] = [];

    liberaBotao: boolean;

    counter: Observable<number> = interval(10 * 1000);
    subscription: Subscription;

    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private empService: EntrepreunersService,
        private alertService: AlertService,
        private webStorageService: WebStorageService
    ) { }

    ngOnInit(): void {
        this.liberaBotao = false;

        this.idEmp = this.activatedRoute.snapshot.params.idEmp;
        this.empService.getInfo(this.idEmp)
            .subscribe(
                (data: Entrepreneur) => {
                    this.emp = data;
                    this.idJogo = this.activatedRoute.snapshot.params.idJogo;
                    this.infoMundo$ = this.empService.getInfoMundo(this.idJogo);
                                
                    this.webStorageService.setData(this.idJogo + 'papel', ['empresario', this.idEmp.toString()]);

                    this.arrumaProdutos();
                }
            );

        this.empService.getInfoAgricultores()
            .subscribe(
                (data: PersonSimplified[]) => {
                    this.nomeAgricultores = data;
                }
            );
        
        this.verificaFimEtapa();
    }

    arrumaProdutos(){
        this.emp.produtos.forEach(
            prod => {
                let aux: ProdutoSimplified = {
                    tipo: prod["tipo"],
                    custo: prod["custo"],
                    setor: this.emp.setor
                }
                this.produtos.push(aux);
            }
        );
    }

    isElectionTurn(rodada: number){
        if((rodada-1)%2 == 0 && rodada != 1) return true;
        return false;
    }

    verificaFimEtapa(){
        this.subscription = this.counter
            .pipe(
                flatMap(
                    () => this.empService.verificaFimEtapa(1)
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
        this.empService.finalizaJogada(this.idEmp)
            .subscribe(
                () => {
                    this.subscription.unsubscribe();
                    if(finishedByMaster) this.alertService.warning('Jogada finalizada pelo Mestre.', true);
                    else this.alertService.success('Jogada finalizada.', true);
                    this.webStorageService.removeData(['orderProduct' + this.idEmp + 'idOrcamento']);
                    this.router.navigate([this.idJogo, 'waitingPage', this.idEmp]);
                },
                err => {
                    console.log(err);
                    this.alertService.danger('Algo deu errado. Por favor, tente novamente.');
                }
            );
        
    }

}
