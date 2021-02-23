import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { interval, Observable, Subscription } from 'rxjs';

import { World } from 'src/app/world/world';
import { BusinessmanService } from './businessman.service';
import { PersonSimplified } from '../world/models/person.simplified';
import { Businessman } from './businessman';
import { ProdutoSimplified } from 'src/app/world/models/produto.simplified';
import { flatMap } from 'rxjs/operators';
import { AlertService } from 'src/app/world/alert/alert.service';
import { WebStorageService } from '../world/web-storage/webstorage.service';

@Component({
    selector: 'app-businessman',
    templateUrl: './businessman.component.html',
    styleUrls: ['./businessman.component.scss']
})
export class BusinessmanComponent implements OnInit {

    infoEmp$: Observable<Businessman>;
    idEmp: number;
    emp: Businessman;

    infoMundo$: Observable<World>;
    idJogo: number;

    nomeAgricultores: PersonSimplified[];
    produtos: ProdutoSimplified[] = [];

    liberaBotao: boolean;

    counter: Observable<number> = interval(10 * 1000);
    subscription: Subscription;

    inLineAlertButton: string = 'Nem todos os jogadores começaram o jogo ainda. Aguarde para finalizar a jogada.';
    
    //public chatAdapter: GorimChatAdapter;

    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private empService: BusinessmanService,
        private alertService: AlertService,
        private webStorageService: WebStorageService,
        //private chatAdapterService: ChatAdapterService
    ) {
    }

    ngOnInit(): void {
        this.idEmp = this.activatedRoute.snapshot.params.idEmp;
        this.idJogo = this.activatedRoute.snapshot.params.idJogo;

        // this.chatAdapter = new GorimChatAdapter(this.chatAdapterService);
        // this.chatAdapter.configAdapter(this.idJogo, this.idEmp);

        this.liberaBotao = false;

        this.empService.getInfo(this.idJogo, this.idEmp)
            .subscribe(
                (data: Businessman) => {
                    this.emp = data;
                    this.infoMundo$ = this.empService.getInfoMundo(this.idJogo);
                    
                    this.webStorageService.setData(this.idJogo + 'papel', ['empresario', this.idEmp.toString(), data.nome]);

                    this.arrumaProdutos();
                }
            );

        this.empService.getInfoAgricultores(this.idJogo)
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
                    () => this.empService.verificaFimEtapa(this.idJogo, 1)
                )
            )
            .subscribe(
                (data: number) => {
                    console.log(data);
                    if(data > 2) {
                        this.liberaBotao = true;
                        this.inLineAlertButton = '';
                    }
                    else if(data == 0){
                        this.subscription.unsubscribe();
                        this.finalizarJogada(true);
                    }
                },
                err => console.log(err)
            );
    }

    finalizarJogada(finishedByMaster: boolean = false){
        if(
            this.webStorageService.getData(this.idEmp + 'voting') != true ||
            finishedByMaster
        ){
            this.empService.finalizaJogada(this.idJogo, this.idEmp)
                .subscribe(
                    () => {
                        this.subscription.unsubscribe();
                        if(finishedByMaster) this.alertService.warning('Jogada finalizada pelo Mestre.', true);
                        else this.alertService.success('Jogada finalizada.', true);
                        this.webStorageService.removeData([
                            'orderProduct' + this.idEmp + 'idOrcamento',
                            this.idEmp + 'voting'
                        ]);
                        this.router.navigate([this.idJogo, 'waitingPage', this.idEmp]);
                    },
                    err => {
                        console.log(err);
                        this.alertService.danger('Algo deu errado. Por favor, tente novamente.');
                    }
                );
        }
        else {
            this.inLineAlertButton = 'É preciso votar para terminar a etapa.';
        }
    }

}
