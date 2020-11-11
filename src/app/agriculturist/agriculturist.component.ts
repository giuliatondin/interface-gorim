import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ProdutoSimplified } from 'src/app/world/models/produto.simplified';

import { World } from 'src/app/world/world';
import { AgriculturistService } from './agriculturist.service';
import { Agriculturist } from './agriculturist';
import { WebStorageService } from '../world/web-storage/webstorage.service';

@Component({
    selector: 'app-agriculturist',
    templateUrl: './agriculturist.component.html',
    styleUrls: ['./agriculturist.component.scss']
})
export class AgriculturistComponent implements OnInit {

    infoAgr$: Observable<Agriculturist>;
    idAgr: number;

    existProducts = true;

    infoMundo$: Observable<World>;
    idJogo: number;

    produtos: ProdutoSimplified[];

    constructor(
        private activatedRoute: ActivatedRoute,
        private agrService: AgriculturistService,
        private webStorageService: WebStorageService
    ) { }

    ngOnInit(): void {
        this.idAgr = this.activatedRoute.snapshot.params.idAgr;
        this.idJogo = this.activatedRoute.snapshot.params.idJogo;
        
        this.webStorageService.setData(this.idJogo + 'papel', ['agricultor', this.idAgr.toString()]);

        this.infoMundo$ = this.agrService.getInfoMundo(this.idJogo);
        this.infoAgr$ = this.agrService.getInfo(this.idAgr);
        this.agrService.getProdutosEmpresarios()
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
