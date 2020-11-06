import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { EntrepreneurHistory } from './entrepreneur-history';
import { EntrepreneurHistoryService } from './entrepreneur-history.service';

@Component({
    selector: 'app-entrepreneur-history',
    templateUrl: './entrepreneur-history.component.html',
    styleUrls: ['./entrepreneur-history.component.scss']
})
export class EntrepreneurHistoryComponent implements OnInit {

    idEmp: number;
    history$: Observable<EntrepreneurHistory>;

    constructor(
        private activatedRoute: ActivatedRoute,
        private empHistoryService: EntrepreneurHistoryService
    ) { }

    ngOnInit(): void {
        this.idEmp = this.activatedRoute.snapshot.params.idEmp;
        this.getHistory();
    }

    getHistory(){
        this.history$ = this.empHistoryService.getHitory(this.idEmp);
    }

}
