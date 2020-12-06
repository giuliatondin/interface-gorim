import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AldermanHistory } from './alderman-history';
import { AldermanHistoryService } from './alderman-history.service';

@Component({
    selector: 'app-alderman-history',
    templateUrl: './alderman-history.component.html',
    styleUrls: ['./alderman-history.component.scss']
})
export class AldermanHistoryComponent implements OnInit {
    
    idJogo: number;

    idVer: number;
    history$: Observable<AldermanHistory>;

    constructor(
        private activatedRoute: ActivatedRoute,
        private empHistoryService: AldermanHistoryService
    ) { }

    ngOnInit(): void {
        this.idVer = this.activatedRoute.snapshot.params.idVer;
        this.idJogo = this.activatedRoute.snapshot.params.idJogo;
        this.getHistory();
    }

    getHistory(){
        this.history$ = this.empHistoryService.getHitory(this.idJogo, this.idVer);
    }

}
