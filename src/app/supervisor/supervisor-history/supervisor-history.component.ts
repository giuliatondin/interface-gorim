import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { SupervisorHistory } from './supervisor-history';
import { SupervisorHistoryService } from './supervisor-history.service';

@Component({
    selector: 'app-supervisor-history',
    templateUrl: './supervisor-history.component.html',
    styleUrls: ['./supervisor-history.component.scss']
})
export class SupervisorHistoryComponent implements OnInit {

    idFis: number;
    history$: Observable<SupervisorHistory>;

    constructor(
        private activatedRoute: ActivatedRoute,
        private fisHistoryService: SupervisorHistoryService
    ) { }

    ngOnInit(): void {
        this.idFis = this.activatedRoute.snapshot.params.idFis;
        this.getHistory();
    }

    getHistory(){
        this.history$ = this.fisHistoryService.getHitory(this.idFis);
    }

    isMaquina(produto: string){
        if(produto.includes("comum") || produto.includes("premium")) return false;
        return true;
    }

}
