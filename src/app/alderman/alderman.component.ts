import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { interval, Observable, Subscription } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import { AlertService } from '../world/alert/alert.service';
import { ChatInfo } from '../world/chat/chat-info';
import { WebSocketService } from '../world/web-socket/web-socket.service';
import { WebStorageService } from '../world/web-storage/webstorage.service';
import { World } from '../world/world';
import { Alderman } from './alderman';
import { AldermanService } from './alderman.service';

@Component({
    selector: 'app-alderman',
    templateUrl: './alderman.component.html',
    styleUrls: [ './alderman.component.scss' ]
})
export class AldermanComponent implements OnInit {
    
    idVer: number;
    idJogo: number;

    infoVer: Alderman;
    nomeCurto: string;
    infoMundo$: Observable<World>;

    liberaBotao: boolean = false;

    counter: Observable<number> = interval(10 * 1000);
    subscription: Subscription;

    chatInfo: ChatInfo;
    
    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private verService: AldermanService,
        private alertService: AlertService,
        private webStorageService: WebStorageService,
        private wsService: WebSocketService
    ){ }

    ngOnInit(){
        this.idVer = this.activatedRoute.snapshot.params.idVer;
        this.idJogo = this.activatedRoute.snapshot.params.idJogo;

        this.verService.getInfo(this.idJogo, this.idVer).subscribe(
            (data: Alderman) => {
                if(data != null){
                    this.infoMundo$ = this.verService.getInfoMundo(this.idJogo);
                    this.nomeCurto = (data.cidade == 'Atlantis') ? 'VerAT' : 'VerCD';

                    this.wsService.changeConnection((this.nomeCurto + this.idJogo), this.nomeCurto, (this.nomeCurto + this.idVer), this.verService);

                    this.chatInfo = {
                        nomePessoa: this.nomeCurto,
                        idPessoa: data.id,
                        idJogo: this.idJogo,
                        role: 'vereador',
                        cidade: data.cidade
                    } as ChatInfo;

                    this.infoVer = data;
                }
                else this.alertService.warning('Algo deu errado ao carregar os dados, por favor, reinicie a página.');
            },
            err => console.log(err)
        );
        this.verificaFimEtapa();
    }

    verificaFimEtapa(){
        this.subscription = this.counter
            .pipe(
                flatMap(
                    () => this.verService.verificaFimEtapa(this.idJogo, 2)
                )
            )
            .subscribe(
                (data: number) => {
                    console.log(data);
                    if (data == 3) this.finalizaJogada(true, true);
                    else if(data > 2) this.liberaBotao = true;
                    else if(data == 0) this.finalizaJogada(true);
                },
                err => console.log(err)
            );
    }

    finalizaJogada(finishedByMaster: boolean = false, gameover: boolean = false){
        this.verService.finalizaJogada(this.idJogo, this.idVer)
            .subscribe(
                () => {
                    this.subscription.unsubscribe();
                    this.webStorageService.removeData(['suggestion' + this.idVer + 'idSugestao']);
                    if(!gameover){
                        if(finishedByMaster) this.alertService.warning('Jogada finalizada pelo Mestre.', true);
                        else this.alertService.success('Jogada finalizada.', true);
                        this.router.navigate([this.idJogo, 'waitingPage', this.idVer]);
                    }
                    this.alertService.warning('O jogo terminou', true);
                    this.router.navigate([this.idJogo, 'gameover']);
                        
                },
                err => {
                    console.log(err);
                    this.alertService.danger('Algo deu errado. Por favor, tente novamente.');
                }
            );
    }


}