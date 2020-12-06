import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { MayorHistory } from './mayor-history';
import { MayorHistoryService } from './mayor-history.service';

@Component({
    selector: 'app-mayor-history',
    templateUrl: './mayor-history.component.html',
    styleUrls: ['./mayor-history.component.scss']
})
export class MayorHistoryComponent implements OnInit {
    
    idJogo: number;
    idPref: number;
    history$: Observable<MayorHistory>;

    constructor(
        private activatedRoute: ActivatedRoute,
        private prefHistoryService: MayorHistoryService
    ) { }

    ngOnInit(): void {
        this.idJogo = this.activatedRoute.snapshot.params.idJogo;
        this.idPref = this.activatedRoute.snapshot.params.idPref;
        this.getHistory();
    }

    getHistory(){
        this.history$ = this.prefHistoryService.getHitory(this.idJogo, this.idPref);
    }

    isMaquina(produto: string){
        if(produto.includes("comum") || produto.includes("premium")) return false;
        return true;
    }

}
