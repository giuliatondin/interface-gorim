import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

import { AlertService } from '../world/alert/alert.service';
import { ChatInfo } from '../world/chat/chat-info';
import { EC_GAME_STATUS, GS_FIM_JOGO, GS_MESTRE_TERMINOU_ETAPA, GS_TODOS_JOGADORES_NA_ETAPA } from '../world/constants/constants';
import { ECGameStatusMessage, GameNotification } from '../world/models/game-notification';
import { PersonSimplified } from '../world/models/person.simplified';
import { WebSocketService } from '../world/web-socket/web-socket.service';
import { WebStorageService } from '../world/web-storage/webstorage.service';
import { World } from '../world/world';
import { FineService } from './fine/fine.service';
import { GreenSealService } from './green-seal/green-seal.service';
import { Fine, GreenSeal, PostForm } from './postForm';
import { Supervisor } from './supervisor';
import { SupervisorService } from './supervisor.service';

@Component({
    selector: 'app-supervisor',
    templateUrl: './supervisor.component.html',
    styleUrls: [ './supervisor.component.scss' ]
})
export class SupervisorComponent implements OnInit {
    
    idFis: number;
    idJogo: number;
    
    pessoas: PersonSimplified[];

    infoFis: Supervisor;
    nomeCurto: string;
    infoMundo$: Observable<World>;

    nomeFines: string[] = ['Baixa', 'Média', 'Alta'];
    fines: Fine[] = [];
    greenSeals: GreenSeal[] = [];

    liberaBotao: boolean = false;
    inLineAlertButton: string = 'Nem todos os jogadores começaram o jogo ainda. Aguarde para finalizar a jogada.';

    chatInfo: ChatInfo;

    private finesSubscription: Subscription;
    private greenSealSubscription: Subscription;
    private notificationSubscription: Subscription;

    constructor(
        private activatedRoute: ActivatedRoute,
        private fisService: SupervisorService,
        private fineService: FineService,
        private greenSealService: GreenSealService,
        private webStorageService: WebStorageService,
        private alertService: AlertService,
        private router: Router,
        private wsService: WebSocketService
    ){ }

    ngOnInit(){
        this.idFis = this.activatedRoute.snapshot.params.idFis;
        this.idJogo = this.activatedRoute.snapshot.params.idJogo;
        
        let etapa: number = 2;
        this.webStorageService.setData(this.idJogo + 'etapa', etapa);

        this.fisService.getInfo(this.idJogo, this.idFis).subscribe(
            (data: Supervisor) => {
                if(data != null){
                    this.infoMundo$ = this.fisService.getInfoMundo(this.idJogo);
                    this.nomeCurto = (data.cidade == 'Atlantis') ? 'FisAT' : 'FisCD';

                    this.wsService.changeConnection((this.nomeCurto + this.idJogo), (this.nomeCurto + this.idFis));

                    this.chatInfo = {
                        nomePessoa: this.nomeCurto,
                        idPessoa: data.id,
                        idJogo: this.idJogo,
                        role: 'fiscal',
                        cidade: data.cidade
                    } as ChatInfo;
                    
                    this.notificationSubscription = this.wsService.sharedNewGameNotification.subscribe(
                        (notification: GameNotification) => {
                            if(notification != null && notification.code == EC_GAME_STATUS){
                                let gameStatus: ECGameStatusMessage = notification.message as ECGameStatusMessage;
                                if (gameStatus.etapa == 2) this.processaGameStatus(gameStatus.status);
                            }
                        }
                    );

                    if(this.webStorageService.hasData('fis'+ this.idFis + 'Fines'))
                        this.fines = this.webStorageService.getData('fis'+ this.idFis + 'Fines') as Fine[];
                    this.webStorageService.setData('fis'+ this.idFis + 'Fines', this.fines);
            
                    this.finesSubscription = this.fineService.sharedFines.subscribe(
                        (fine: Fine) => {
                            if(fine.idPessoa != 0){
                                this.fines.push(fine);
                                this.webStorageService.setData('fis'+ this.idFis + 'Fines', this.fines);
                            }
                        },
                        err => console.log(err)
                    );
                    
                    if(this.webStorageService.hasData('fis'+ this.idFis + 'GreenSeals'))
                        this.greenSeals = this.webStorageService.getData('fis'+ this.idFis + 'GreenSeals') as GreenSeal[];
                    this.webStorageService.setData('fis'+ this.idFis + 'GreenSeals', this.greenSeals);
            
                    this.greenSealSubscription = this.greenSealService.sharedGreenSeals.subscribe(
                        (greenSeal: GreenSeal) => {
                            if(greenSeal.idAgr != 0){
                                this.greenSeals.push(greenSeal);
                                this.webStorageService.setData('fis'+ this.idFis + 'GreenSeals', this.greenSeals);
                            }
                        },
                        err => console.log(err)
                    );
            
                    this.fineService.getInfoPessoas(this.idJogo, data.cidade).subscribe(
                        (data: PersonSimplified[]) => {
                            this.pessoas = data;
                        },
                        err => console.log(err)
                    );
                    
                    this.fisService.verificaTodosComecaramEtapa(this.idJogo, 2).subscribe(
                        (data: number) => {
                            if(data == 0) this.processaGameStatus(GS_TODOS_JOGADORES_NA_ETAPA);
                            else if(data == -2 || data == GS_FIM_JOGO) this.finalizarJogada(true, true);
                        },
                        err => console.log(err)
                    );

                    this.infoFis = data;
                }
                else this.alertService.warning('Algo deu errado ao carregar os dados, por favor, reinicie a página.');
            },
            err => console.log(err)
        );
    }

    removeFine(fine: Fine){
        this.fines.splice(this.fines.indexOf(fine), 1);
        this.alertService.success("Removido.");
        this.webStorageService.setData('fis'+ this.idFis + 'GreenSeals', this.fines);
        this.fineService.nextDesmultaId(fine.idPessoa);
    }

    removeGreenSeal(greenSeal: GreenSeal){
        this.greenSeals.splice(this.greenSeals.indexOf(greenSeal), 1);
        this.alertService.success("Removido.");
        this.webStorageService.setData('fis'+ this.idFis + 'GreenSeals', this.greenSeals);
    }

    getNomePessoa(idPessoa: number){
        this.pessoas.forEach(pessoa => {
            if(pessoa.id == idPessoa) return pessoa.nome;
        });
    }

    processaGameStatus(status: number){
        console.log('status: ' + status);
        if(status == GS_FIM_JOGO) this.finalizarJogada(true, true);
        else if(status == GS_TODOS_JOGADORES_NA_ETAPA){
            this.liberaBotao = true;
            this.inLineAlertButton = '';
        }
        else if(status == GS_MESTRE_TERMINOU_ETAPA) this.finalizarJogada(true);
    }

    finalizarJogada(finishedByMaster: boolean = false, gameover: boolean = false){
        this.webStorageService.setData('hasMasterFinishedStage', finishedByMaster);
        this.fisService.finalizaJogada(
            this.idJogo,
            this.idFis,
            {
                multas: this.fines,
                selosVerde: this.greenSeals
            } as PostForm
        ).subscribe(
            () => {
                this.webStorageService.removeData([
                    'fine' + this.idFis + 'pessoasMultadas',
                    'fis'+ this.idFis + 'Fines',
                    'fis'+ this.idFis + 'GreenSeals'
                ]);
                this.greenSealSubscription.unsubscribe();
                this.finesSubscription.unsubscribe();
                this.notificationSubscription.unsubscribe();
                if(!gameover){
                    if(finishedByMaster) this.alertService.warning('Jogada finalizada pelo Mestre.', true);
                    else this.alertService.success('Jogada finalizada.', true);
                    this.router.navigate([this.idJogo, 'waitingPage', this.idFis]);
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
}