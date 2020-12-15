import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ProdutoSimplified } from 'src/app/world/models/produto.simplified';

import { World } from 'src/app/world/world';
import { FarmerService } from './farmer.service';
import { Farmer } from './farmer';
import { WebStorageService } from '../world/web-storage/webstorage.service';
import { GorimChatAdapter } from '../world/chat-adapter/chat-adapter';
import { ChatAdapterService } from '../world/chat-adapter/chat-adapter.service';

@Component({
    selector: 'app-farmer',
    templateUrl: './farmer.component.html',
    styleUrls: ['./farmer.component.scss']
})
export class FarmerComponent implements OnInit {

    infoAgr$: Observable<Farmer>;
    idAgr: number;

    existProducts = true;

    infoMundo$: Observable<World>;
    idJogo: number;

    produtos: ProdutoSimplified[];

    public chatAdapter: GorimChatAdapter;

    constructor(
        private activatedRoute: ActivatedRoute,
        private agrService: FarmerService,
        private webStorageService: WebStorageService,
        private chatAdapterService: ChatAdapterService
    ) { }

    ngOnInit(): void {
        this.idAgr = this.activatedRoute.snapshot.params.idAgr;
        this.idJogo = this.activatedRoute.snapshot.params.idJogo;

        this.chatAdapter = new GorimChatAdapter(this.chatAdapterService);
        this.chatAdapter.configAdapter(this.idJogo, this.idAgr);
        
        this.webStorageService.setData(this.idJogo + 'papel', ['agricultor', this.idAgr.toString()]);

        this.infoMundo$ = this.agrService.getInfoMundo(this.idJogo);
        this.infoAgr$ = this.agrService.getInfo(this. idJogo, this.idAgr);
        this.agrService.getProdutosEmpresarios(this.idJogo)
            .subscribe(
                produtos => {
                    this.produtos = produtos;
                }
            )
    }

    isElectionTurn(rodada: number){
        if((rodada-1)%2 == 0 && rodada != 1) return true;
        return false;
    }

}
