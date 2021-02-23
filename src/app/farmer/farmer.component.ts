import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ProdutoSimplified } from 'src/app/world/models/produto.simplified';

import { World } from 'src/app/world/world';
import { FarmerService } from './farmer.service';
import { Farmer } from './farmer';
import { WebStorageService } from '../world/web-storage/webstorage.service';

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

    constructor(
        private activatedRoute: ActivatedRoute,
        private agrService: FarmerService,
        private webStorageService: WebStorageService
    ) {
    }

    ngOnInit(): void {
        this.idAgr = this.activatedRoute.snapshot.params.idAgr;
        this.idJogo = this.activatedRoute.snapshot.params.idJogo;
        
        this.webStorageService.setData(this.idJogo + 'papel', ['agricultor', this.idAgr.toString()]);

        
        this.agrService.getInfo(this. idJogo, this.idAgr).subscribe(
            (data: Farmer) => {
                this.agr = data;
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

}
