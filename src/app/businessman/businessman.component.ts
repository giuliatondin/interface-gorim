import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

import { World } from 'src/app/world/world';
import { BusinessmanService } from './businessman.service';
import { PersonSimplified } from '../world/models/person.simplified';
import { Businessman } from './businessman';
import { ProdutoSimplified } from 'src/app/world/models/produto.simplified';
import { AlertService } from 'src/app/world/alert/alert.service';
import { WebStorageService } from '../world/web-storage/webstorage.service';
import { WebSocketService } from '../world/web-socket/web-socket.service';
import { ChatInfo } from '../world/chat/chat-info';
import { ECGameStatusMessage, GameNotification } from '../world/models/game-notification';
import { GS_FIM_JOGO, GS_MESTRE_TERMINOU_ETAPA, GS_TODOS_JOGADORES_NA_ETAPA } from '../world/constants/constants';

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
    inLineAlertButton: string = 'Nem todos os jogadores começaram o jogo ainda. Aguarde para finalizar a jogada.';
    
    chatInfo: ChatInfo;

    bIsElectionTurn: boolean;

    private notificationSubscription: Subscription;

    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private empService: BusinessmanService,
        private alertService: AlertService,
        private webStorageService: WebStorageService,
        private wsService: WebSocketService
    ) {
    }

    ngOnInit(): void {
        this.idEmp = this.activatedRoute.snapshot.params.idEmp;
        this.idJogo = this.activatedRoute.snapshot.params.idJogo;
        this.bIsElectionTurn = false;

        this.liberaBotao = false;

        let etapa: number = 1;
        this.webStorageService.setData(this.idJogo + 'etapa', etapa);

        this.empService.getInfo(this.idJogo, this.idEmp).subscribe(
            (data: Businessman) => {
                if(data != null){
                    this.emp = data;
                    this.infoMundo$ = this.empService.getInfoMundo(this.idJogo);
                    
                    this.chatInfo = {
                        nomePessoa: data.nome,
                        idPessoa: data.id,
                        idJogo: this.idJogo,
                        role: 'empresario',
                        cidade: data.cidade
                    } as ChatInfo;
                    
                    this.webStorageService.setData(
                        this.idJogo + 'papel',
                        JSON.stringify(this.chatInfo)
                    );

                    if(!this.wsService.isConnected()){
                        this.wsService.config(
                            this.emp.nome + this.idJogo,
                            this.emp.nome + this.idEmp
                        );
                        this.wsService.connect();
                    }
                    else {
                        this.wsService.changeConnection(
                            this.emp.nome + this.idJogo,
                            this.emp.nome + this.idEmp
                        );
                    }

                    this.notificationSubscription = this.wsService.sharedNewGameNotification.subscribe(
                        (notification: GameNotification) => {
                            console.log(notification);
                            if(notification != null){
                                this.empService.nextGameNotification(notification);
                                let gameStatus: ECGameStatusMessage = notification.message as ECGameStatusMessage;
                                if(gameStatus.etapa == 1) this.processaGameStatus(gameStatus.status);
                            }
                        }
                    );
                
                    this.empService.verificaTodosComecaramEtapa(this.idJogo, 1).subscribe(
                        (data: number) => {
                            if(data == 0) this.processaGameStatus(GS_TODOS_JOGADORES_NA_ETAPA);
                            else if(data == -2 || data == GS_FIM_JOGO) this.finalizarJogada(true, true);
                        },
                        err => console.log(err)
                    );

                    this.arrumaProdutos();
                }
                else this.alertService.warning('Algo deu errado. Por favor, reinicie a página.');
            }
        );

        this.empService.getInfoAgricultores(this.idJogo).subscribe(
            (data: PersonSimplified[]) => {
                if(data != null) this.nomeAgricultores = data;
            },
            err => console.log(err)
        );
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
        if((rodada-1)%2 == 0 && rodada != 1){
            this.bIsElectionTurn = true;
            return true;
        }
        else return false;
    }

    processaGameStatus(status: number){
        if (status == GS_FIM_JOGO) this.finalizarJogada(true, true);
        else if(status == GS_TODOS_JOGADORES_NA_ETAPA) {
            this.liberaBotao = true;
            this.inLineAlertButton = '';
        }
        else if(status == GS_MESTRE_TERMINOU_ETAPA) this.finalizarJogada(true);
    }

    shouldLetFinish(finishedByMaster: boolean){
        return (
            (this.bIsElectionTurn && this.webStorageService.hasData(this.idEmp + 'voting')) ||
            !this.bIsElectionTurn ||
            finishedByMaster
        );
    }

    finalizarJogada(finishedByMaster: boolean = false, gameover: boolean = false){
        console.log('finishedByMaster=' + finishedByMaster);
        if(this.shouldLetFinish(finishedByMaster)){
            this.webStorageService.setData('hasMasterFinishedStage', finishedByMaster);
            this.empService.finalizaJogada(this.idJogo, this.idEmp).subscribe(
                () => {
                    this.webStorageService.removeData([
                        'orderProduct' + this.idEmp + 'idOrcamento',
                        this.idEmp + 'voting'
                    ]);
                    this.notificationSubscription.unsubscribe();
                    if(!gameover){
                        if(finishedByMaster) this.alertService.warning('Jogada finalizada pelo Mestre.', true);
                        else this.alertService.success('Jogada finalizada.', true);
                        this.router.navigate([this.idJogo, 'waitingPage', this.idEmp]);
                    }
                    else {
                        this.alertService.warning('O jogo terminou', true);
                        this.router.navigate([this.idJogo, 'gameover']);
                    }
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
