import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { MasterService } from './master.service';
import { World } from '../world/world';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../world/alert/alert.service';
import { ConfirmingModalService } from '../world/confirming-modal/confirming-modal.service';
import { ConfirmingModal } from '../world/confirming-modal/confirming-modal';
import { ResponseModalService } from '../world/confirming-modal/response-modal.service';
import { WebStorageService } from '../world/web-storage/webstorage.service';
import { ChatInfo } from '../world/chat/chat-info';
import { WebSocketService } from '../world/web-socket/web-socket.service';
import { ECGameStatusMessage, GameNotification } from '../world/models/game-notification';
import { EC_GAME_STATUS, GS_JOGADORES_ACABARAM_ETAPA, GS_TODOS_JOGADORES_NA_ETAPA } from '../world/constants/constants';

@Component({
    selector: 'app-master',
    templateUrl: './master.component.html',
    styleUrls: ['./master.component.scss']
})
export class MasterComponent implements OnInit, OnDestroy {

    infoMundo$: Observable<World>;
    mundo: World;
    idJogo: number;

    apareceBotao: boolean = false;

    inicioEtapa: number = new Date().getTime();

    chatInfo: ChatInfo;
    mestreNome: string = 'Mestre';
    mestreId: number = 0;

    isFinalizarJogoButton: boolean = false;

    private modalSubscription: Subscription;
    private notificationSubscription: Subscription;

    hasUnfinishedPlayers: boolean;
    private hasMasterFinishedStage: boolean = false;

    constructor(
        private masterService: MasterService,
        private activatedRoute: ActivatedRoute,
        private alertService: AlertService,
        private confirmingModalService: ConfirmingModalService,
        private responseModalService: ResponseModalService,
        private webStorageService: WebStorageService,
        private wsService: WebSocketService,
        private router: Router
    ) { }

    ngOnInit(){
        this.idJogo = this.activatedRoute.snapshot.params.idJogo;
        this.hasUnfinishedPlayers = true;
        this.infoMundo$ = this.masterService.getInfoMundo(this.idJogo);
        this.putInMundo();

        if(this.webStorageService.hasData('masterHoraInicioEtapa'))
            this.inicioEtapa = this.webStorageService.getData('masterHoraInicioEtapa');
        this.webStorageService.setData('masterHoraInicioEtapa', this.inicioEtapa);

        this.modalSubscription = this.responseModalService.sharedResponse.subscribe(
            (response: boolean) => {
                if(response != null){
                    if (response){
                        if(this.isFinalizarJogoButton) this.finalizarJogo();
                        this.finalizarEtapa();
                    }
                    else this.isFinalizarJogoButton = false;
                }
            },
            err => console.log(err)
        );
        
        this.wsService.config(
            this.mestreNome + this.idJogo,
            this.mestreNome + this.mestreId
        );
        this.wsService.connect();

        this.notificationSubscription = this.wsService.sharedNewGameNotification.subscribe(
            (notification: GameNotification) => {
                if(notification != null){
                    this.masterService.nextGameNotification(notification);
                    if(notification.code == EC_GAME_STATUS){
                        let gameStatus = notification.message as ECGameStatusMessage;
                        this.processaSituacaoEtapa(gameStatus.status);
                    }
                }
            }
        );

        this.chatInfo = {
            cidade: '',
            idJogo: this.idJogo,
            nomePessoa: this.mestreNome,
            idPessoa: this.mestreId,
            role: 'mestre'
        } as ChatInfo;
    }

    ngOnDestroy(){
        this.modalSubscription.unsubscribe();
        this.notificationSubscription.unsubscribe();
    }

    putInMundo(){
        this.infoMundo$.subscribe(
            (data: World) => {
                this.mundo = data;
            },
            err => console.log(err)
        );
    }
    
    processaSituacaoEtapa(status: number){
        console.log(status);
        if(status == GS_TODOS_JOGADORES_NA_ETAPA){
            this.hasUnfinishedPlayers = true;
            this.alertService.info('Todos os jogadores estão na etapa.');
        }
        else if(status == GS_JOGADORES_ACABARAM_ETAPA){
            this.hasUnfinishedPlayers = false;
            this.alertService.info('Todos os jogadores acabaram a jogada. Termine a etapa pelo botão!');
            if (this.hasMasterFinishedStage){
                this.infoMundo$ = this.masterService.getInfoMundo(this.idJogo);
                this.putInMundo();
                this.hasUnfinishedPlayers = true;
                this.hasMasterFinishedStage = false;
            }
        }
    }

    openModal(botao: number){
        if (botao === 1) this.isFinalizarJogoButton = true;
        let strModalContent: string;

        if (botao === 0 && this.hasUnfinishedPlayers) strModalContent = 'Parece que ainda há jogadores que não terminaram a jogada. Deseja encerrar a etapa mesmo assim?';
        else strModalContent = 'Esta ação não pode ser desfeita. Finalizar assim mesmo?';

        const confirmingModal: ConfirmingModal = {
            modalTitle: (botao === 0) ? 'Encerrar etapa' : 'Finalizar Jogo',
            modalContent: strModalContent,
            modalConfirmBtnText: 'Sim',
            modalCancelBtnText: 'Não'
        };
        this.confirmingModalService.openModal(confirmingModal, 'master-modal');
    }

    finalizarEtapa(){
        this.masterService.finalizarEtapa(this.idJogo, this.mundo.rodada, this.mundo.etapa)
            .subscribe(
                (data: boolean) => {
                    if(data){
                        this.hasMasterFinishedStage = true;
                        if(!this.hasUnfinishedPlayers){
                            this.infoMundo$ = this.masterService.getInfoMundo(this.idJogo);
                            this.putInMundo();
                            this.hasMasterFinishedStage = false;
                            this.hasUnfinishedPlayers = true;
                        }
                        this.alertService.success('Etapa terminada.');
                        this.inicioEtapa = new Date().getTime();
                        this.webStorageService.setData('masterHoraInicioEtapa', this.inicioEtapa);
                    }
                    else this.alertService.danger('Algo deu errado. Etapa não finalizada.');
                },
                err => {
                    this.alertService.danger('Algo deu errado. Por favor, tente novamente.');
                    console.log(err);
                }
            );
    }

    finalizarJogo(){
        this.masterService.finalizarJogo(this.idJogo).subscribe(
            (data: boolean) => {
                if(data){
                    this.masterService.nextGameStatus(true);
                    this.webStorageService.removeData(['masterHoraInicioEtapa']);
                    this.alertService.warning('O jogo terminou', true);
                    this.router.navigate([this.idJogo, 'gameover']);
                }
                else this.alertService.danger('Algo deu errado. Tente novamente');
            }
        );
    }
}
