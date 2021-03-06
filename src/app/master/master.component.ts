import { Component, OnInit } from '@angular/core';
import { interval, Observable } from 'rxjs';

import { MasterService } from './master.service';
import { World } from '../world/world';
import { ActivatedRoute, Router } from '@angular/router';
import { flatMap } from 'rxjs/operators';
import { AlertService } from '../world/alert/alert.service';
import { ConfirmingModalService } from '../world/confirming-modal/confirming-modal.service';
import { ConfirmingModal } from '../world/confirming-modal/confirming-modal';
import { ResponseModalService } from '../world/confirming-modal/response-modal.service';
import { WebStorageService } from '../world/web-storage/webstorage.service';
import { ChatInfo } from '../world/chat/chat-info';
import { WebSocketService } from '../world/web-socket/web-socket.service';

@Component({
    selector: 'app-master',
    templateUrl: './master.component.html',
    styleUrls: ['./master.component.scss']
})
export class MasterComponent implements OnInit {

    infoMundo$: Observable<World>;
    mundo: World;
    idJogo: number;

    hasUnfinishedPlayers: boolean;

    apareceBotao: boolean = false;

    inicioEtapa: number = new Date().getTime();

    chatInfo: ChatInfo;
    mestreNome: string = 'Mestre';
    mestreId: number = 0;

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

    ngOnInit(): void {
        this.idJogo = this.activatedRoute.snapshot.params.idJogo;
        this.hasUnfinishedPlayers = true;
        this.infoMundo$ = this.masterService.getInfoMundo(this.idJogo);
        this.putInMundo();

        if(this.webStorageService.hasData('masterHoraInicioEtapa'))
            this.inicioEtapa = this.webStorageService.getData('masterHoraInicioEtapa');
        this.webStorageService.setData('masterHoraInicioEtapa', this.inicioEtapa);

        this.responseModalService.sharedResponse.subscribe(
            (response: boolean) => {
                if(response != null) this.finalizarEtapa(response);
            },
            err => console.log(err)
        );
        
        this.wsService.config(
            this.mestreNome + this.idJogo,
            this.mestreNome,
            this.mestreNome + this.mestreId,
            this.masterService
        );
        this.wsService.connect();

        this.chatInfo = {
            cidade: '',
            idJogo: this.idJogo,
            nomePessoa: this.mestreNome,
            idPessoa: this.mestreId,
            role: 'mestre'
        } as ChatInfo;
    }

    putInMundo(){
        this.infoMundo$.subscribe(
            (data: World) => {
                this.mundo = data;
                this.getSituacaoEtapa();
            },
            err => console.log(err)
        );
    }
    
    getSituacaoEtapa(){
        interval(10 * 1000)
            .pipe(
                flatMap(
                    () => this.masterService.getSituacaoEtapa(this.idJogo, this.mundo.etapa)
                )
            )
            .subscribe(
                (data: number) => {
                    console.log(data);
                    if(data == 0){
                        this.apareceBotao = false;
                    }
                    else if(data == 2){
                        this.apareceBotao = true;
                        this.masterService.changeFlagFimEtapa(this.idJogo)
                            .subscribe(
                                () => this.alertService.info('Todos os jogadores começaram a etapa.'),
                                err => console.log(err)
                            );
                    }
                    else if(data == 3){
                        this.hasUnfinishedPlayers = false;
                    }
                    else if(data == 1 && (new Date().getTime()) > (this.inicioEtapa + (1000*60*2) ) ){
                        console.log('Passou de 2 minutos');
                        this.apareceBotao = true;
                        this.masterService.changeFlagFimEtapa(this.idJogo)
                            .subscribe(
                                () => this.alertService.info('O jogador ainda não conectou, mas foi liberado para os outros jogadores terminarem a etapa, se quiserem.'),
                                err => console.log(err)
                            );
                    }
                    else if(data == 1 && (new Date().getTime()) > (this.inicioEtapa + (1000*60*1) ) ){
                        console.log('Mais de um minuto');
                        this.alertService.info('Algo de errado aconteceu com um jogador e ele ainda não começou a etapa.');
                    }
                },
                err => console.log(err)
            );
    }

    receiveUserChoice($event: boolean){
        this.finalizarEtapa($event);
    }

    openModal(){
        const confirmingModal: ConfirmingModal = {
            modalTitle: 'Encerrar etapa',
            modalContent: 'Parece que ainda há jogadores que não terminaram a jogada. Deseja encerrar a etapa mesmo assim?',
            modalConfirmBtnText: 'Sim',
            modalCancelBtnText: 'Não'
        };
        this.confirmingModalService.openModal(confirmingModal, 'master-modal');
    }

    finalizarEtapa(userChoice: boolean){
        if(userChoice){
            this.masterService.finalizarEtapa(this.idJogo)
                .subscribe(
                    (data: boolean) => {
                        if(data){
                            this.alertService.success('Etapa terminada.');
                            this.inicioEtapa = new Date().getTime();
                            this.webStorageService.setData('masterHoraInicioEtapa', this.inicioEtapa);
                            this.hasUnfinishedPlayers = true;
                            this.infoMundo$ = this.masterService.getInfoMundo(this.idJogo);
                            this.putInMundo();
                        }
                        else this.alertService.danger('Algo deu errado. Etapa não finalizada.');
                    },
                    err => {
                        this.alertService.danger('Algo deu errado. Por favor, tente novamente.');
                        console.log(err);
                    }
                );
        }
    }

    finalizarJogo(){
        this.masterService.finalizarJogo(this.idJogo).subscribe(
            (data: boolean) => {
                if(data){
                    this.webStorageService.removeData(['masterHoraInicioEtapa']);
                    this.alertService.warning('O jogo terminou', true);
                    this.router.navigate([this.idJogo, 'gameover']);
                }
                else this.alertService.danger('Algo deu errado. Tente novamente');
            }
        );
    }
}
