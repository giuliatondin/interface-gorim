import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { ProdutoSimplified } from 'src/app/world/models/produto.simplified';

import { World } from 'src/app/world/world';
import { FarmerService } from './farmer.service';
import { Farmer } from './farmer';
import { WebStorageService } from '../world/web-storage/webstorage.service';
import { WebSocketService } from '../world/web-socket/web-socket.service';
import { ChatInfo } from '../world/chat/chat-info';
import { ECGameStatusMessage, GameNotification } from '../world/models/game-notification';
import { EC_GAME_STATUS, GS_JOGADORES_ACABARAM_ETAPA, GS_MESTRE_TERMINOU_ETAPA } from '../world/constants/constants';
import { PostForm } from './postForm';
import { AlertService } from '../world/alert/alert.service';

@Component({
    selector: 'app-farmer',
    templateUrl: './farmer.component.html',
    styleUrls: ['./farmer.component.scss']
})
export class FarmerComponent implements OnInit, OnDestroy {

    infoAgr$: Observable<Farmer>;
    idAgr: number;

    agr: Farmer = null;

    existProducts = true;

    infoMundo$: Observable<World>;
    idJogo: number;

    produtos: ProdutoSimplified[];

    chatInfo: ChatInfo;

    private notificationSubscription: Subscription;

    constructor(
        private activatedRoute: ActivatedRoute,
        private agrService: FarmerService,
        private webStorageService: WebStorageService,
        private wsService: WebSocketService,
        private router: Router,
        private alertService: AlertService
    ) {
    }

    ngOnInit(): void {
        this.idAgr = this.activatedRoute.snapshot.params.idAgr;
        this.idJogo = this.activatedRoute.snapshot.params.idJogo;
        console.log("ngOnInit!!!!");

        let etapa: number = 1;
        this.webStorageService.setData(this.idJogo + 'etapa', etapa);
        
        this.agrService.getInfo(this. idJogo, this.idAgr).subscribe(
            (data: Farmer) => {
                this.agr = data;

                this.chatInfo = {
                    nomePessoa: data.nome,
                    idPessoa: data.id,
                    idJogo: this.idJogo,
                    role: 'agricultor',
                    cidade: data.cidade
                } as ChatInfo;

                this.webStorageService.setData(this.idJogo + 'papel', JSON.stringify(this.chatInfo));

                if(!this.wsService.isConnected()){
                    this.wsService.config(
                        this.agr.nome + this.idJogo,
                        this.agr.nome + this.idAgr
                    );
                    this.wsService.connect();
                }
                else {
                    this.wsService.changeConnection(
                        this.agr.nome + this.idJogo,
                        this.agr.nome + this.idAgr
                    );
                }

                this.notificationSubscription = this.wsService.sharedNewGameNotification.subscribe(
                    (notification: GameNotification) => {
                        console.log(notification);
                        if(notification != null){
                            this.agrService.nextGameNotification(notification);
                            if(notification != null && notification.code == EC_GAME_STATUS){
                                let gameStatus: ECGameStatusMessage = notification.message as ECGameStatusMessage;
                                if(
                                    gameStatus.etapa == 1 &&
                                    (gameStatus.status == GS_JOGADORES_ACABARAM_ETAPA || gameStatus.status == GS_MESTRE_TERMINOU_ETAPA)
                                ){
                                    //
                                }
                            }
                        }
                    }
                );

                this.agrService.sharedPostForm.subscribe(
                    (newForm: PostForm) => {
                        if (newForm != null){
                            this.finalizaEtapa(newForm);
                        }
                    }
                );
            }
        );

        this.infoMundo$ = this.agrService.getInfoMundo(this.idJogo);
        this.agrService.getProdutosEmpresarios(this.idJogo).subscribe(
            (produtos: ProdutoSimplified[]) => this.produtos = produtos,
            err => console.log(err)
        );
    }

    ngOnDestroy(){
        console.log("NgOnDestroy###");
        this.notificationSubscription.unsubscribe();
    }

    isElectionTurn(rodada: number){
        if((rodada-1)%2 == 0 && rodada != 1) return true;
        return false;
    }

    finalizaEtapa(postForm: PostForm){
        this.agrService.postAgricultiristForm(this.idJogo, this.idAgr, postForm).subscribe(
            () => {
                console.log("Finaliza etapa?");
                this.webStorageService.removeData([
                    'agr'+ this.idAgr + 'ParcelCheckedButtons',
                    'agr'+ this.idAgr + 'VendaQuantidadeProdutos',
                    'agr'+ this.idAgr + 'ParcelPedirSeloVerde',
                    'agr'+ this.idAgr + 'ParcelQuantidades',
                    this.idAgr + 'voting'
                ]);

                this.router.navigate([this.idJogo, 'waitingPage', this.idAgr], { replaceUrl: true });
            },
            err => {
                console.log(err);
                this.alertService.danger('Algo deu errado. Por favor, tente novamente.');
            }
        );
    }

}
