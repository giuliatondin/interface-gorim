import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { interval, Observable, Subscription } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import { WebStorageService } from '../world/web-storage/webstorage.service';
import { AlertService } from '../world/alert/alert.service';
import { World } from '../world/world';
import { WaitingPageService } from './waiting-page.service';
import { LoginLogoutService } from '../world/login-logout/login-logout.service';
import { WebSocketService } from '../world/web-socket/web-socket.service';
import { ChatInfo } from '../world/chat/chat-info';

@Component({
    selector: 'app-waiting-page',
    templateUrl: './waiting-page.component.html',
    styleUrls: [ './waiting-page.component.scss' ]
})
export class WaitingPageComponent implements OnInit{

    infoMundo: World;
    idJogo: number;
    idPessoa: number;

    counter: Observable<number> = interval(10 * 1000);
    subscription: Subscription

    chatInfo: ChatInfo;

    constructor(
        private waitingPageService: WaitingPageService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private webStorageService: WebStorageService,
        private alertService: AlertService,
        private loginLogoutService: LoginLogoutService,
        private wsService: WebSocketService
    ){ }

    ngOnInit(){
        this.idPessoa = this.activatedRoute.snapshot.params.idPessoa;
        this.idJogo = this.activatedRoute.snapshot.params.idJogo;

        this.chatInfo = JSON.parse(this.webStorageService.getData(this.idJogo + 'papel')) as ChatInfo;
        console.log(this.chatInfo);
        this.waitingPageService.getInfoMundo(this.idJogo)
            .subscribe(
                (data: World) => {
                    if(data != null){
                        this.infoMundo = data;
                        this.verificaFimEtapa();
                    }
                    else this.alertService.warning('Algo deu errado ao carregar os dados, por favor, reinicie a página.');
                },
                err => console.log(err)
            );
    }

    verificaFimEtapa(){
        this.infoMundo.etapa = (this.idPessoa <= this.infoMundo.quantidadeJogadores) ? 1 : 2;
        this.subscription = this.counter
            .pipe(
                flatMap(
                    () => this.waitingPageService.verificaFimEtapa(this.idJogo, this.infoMundo.etapa)
                )
            )
            .subscribe(
                (response: number) => {
                    if(response == 0) {
                        this.subscription.unsubscribe();
                        if(this.infoMundo.etapa == 1){
                            this.waitingPageService.getPapelSegundaEtapa(this.idJogo, this.chatInfo.idPessoa)
                            .subscribe(
                                (idProximaEtapa: number) => {
                                    this.alertService.info('A segunta etapa vai começar.');
                                    if(idProximaEtapa == 0)
                                        this.router.navigate([this.idJogo, 'segundaEtapa', this.chatInfo.idPessoa]);
                                    else {
                                        let id = Math.floor(idProximaEtapa/10);
                                        let papel: string;
                                        let nome: string;

                                        if(idProximaEtapa%10 == 0){
                                            papel = 'fiscalAmbiental';
                                            nome = 'Fiscal';
                                        }
                                        else if(idProximaEtapa%10 == 1){
                                            papel = 'prefeito';
                                            nome = 'Prefeito';
                                        }
                                        else{
                                            papel = 'vereador';
                                            nome = 'Vereador';
                                        }

                                        if(id%2 == 0) nome += 'CD';
                                        else nome += 'AT';
                                        this.router.navigate([this.idJogo, papel, id]);
                                    }
                                }
                            );
                        }
                        else {
                            this.alertService.info('A próxima rodada vai começar.');
                            if(this.chatInfo.idPessoa > this.infoMundo.quantidadeJogadores){
                                this.loginLogoutService.logout();
                                this.loginLogoutService.login(this.idJogo, this.chatInfo.idPessoa, this.chatInfo.nomePessoa);
                            }
                            this.router.navigate([this.idJogo, this.chatInfo.role, this.chatInfo.idPessoa]);
                        }
                    }
                    else if(response == 3){
                        this.alertService.warning('O jogo terminou.');
                        this.router.navigate([this.idJogo, 'gameover']);
                    }
                },
                err => console.log(err)
            );
    }
}