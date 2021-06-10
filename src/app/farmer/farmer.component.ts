import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ProdutoSimplified } from 'src/app/world/models/produto.simplified';

import { World } from 'src/app/world/world';
import { FarmerService } from './farmer.service';
import { Farmer } from './farmer';
import { WebStorageService } from '../world/web-storage/webstorage.service';
import { WebSocketService } from '../world/web-socket/web-socket.service';
import { ChatInfo } from '../world/chat/chat-info';

@Component({
    selector: 'app-farmer',
    templateUrl: './farmer.component.html',
    styleUrls: ['./farmer.component.scss']
})
export class FarmerComponent implements OnInit {

    infoAgr$: Observable<Farmer>;
    idAgr: number;

    agr: Farmer = null;//{} as Farmer;

    existProducts = true;

    infoMundo$: Observable<World>;
    idJogo: number;

    produtos: ProdutoSimplified[];

    chatInfo: ChatInfo;

    constructor(
        private activatedRoute: ActivatedRoute,
        private agrService: FarmerService,
        private webStorageService: WebStorageService,
        private wsService: WebSocketService
    ) {
    }

    ngOnInit(): void {
        this.idAgr = this.activatedRoute.snapshot.params.idAgr;
        this.idJogo = this.activatedRoute.snapshot.params.idJogo;
        
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
                
                this.wsService.config(
                    this.agr.nome + this.idJogo,
                    this.agr.nome,
                    this.agr.nome + this.idAgr,
                    this.agrService
                );
                this.wsService.connect(
                    /*this.agr.nome + this.idAgr*/
                );
            }
        );

        this.infoMundo$ = this.agrService.getInfoMundo(this.idJogo);
        this.agrService.getProdutosEmpresarios(this.idJogo)
            .subscribe(
                produtos => {
                    this.produtos = produtos;
                }
            );
    }

    isElectionTurn(rodada: number){
        if((rodada-1)%2 == 0 && rodada != 1) return true;
        return false;
    }

    onFinalizarJogada($event){
        //
    }

}
