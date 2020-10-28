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
        private empHistoryService: SupervisorHistoryService
    ) { }

    ngOnInit(): void {
        this.idFis = this.activatedRoute.snapshot.params.idEmp;
        this.getHistory();
    }

    getHistory(){
        this.history$ = this.empHistoryService.getHitory(this.idFis);
    }

}
