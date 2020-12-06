import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { FarmerHistory } from './farmer-history';
import { FarmerHistoryService } from './farmer-history.service';

@Component({
    selector: 'app-farmer-history',
    templateUrl: './farmer-history.component.html',
    styleUrls: ['./farmer-history.component.scss']
})
export class FarmerHistoryComponent implements OnInit {
    idJogo: number;
    idAgr: number;
    history$: Observable<FarmerHistory>;

    constructor(
        private activatedRoute: ActivatedRoute,
        private agrHistoryService: FarmerHistoryService
    ){ }

    ngOnInit(): void {
        this.idJogo = this.activatedRoute.snapshot.params.idJogo;
        this.idAgr = this.activatedRoute.snapshot.params.idAgr;
        this.getHistory();
    }

    getHistory(){
        this.history$ = this.agrHistoryService.getHistory(this.idJogo, this.idAgr);
    }

    isMaquina(produto: string){
        if(produto.includes("comum") || produto.includes("premium")) return false;
        return true;
    }

}
