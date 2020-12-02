import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { BusinessmanHistory } from './businessman-history';
import { BusinessmanHistoryService } from './businessman-history.service';

@Component({
    selector: 'app-businessman-history',
    templateUrl: './businessman-history.component.html',
    styleUrls: ['./businessman-history.component.scss']
})
export class BusinessmanHistoryComponent implements OnInit {

    idEmp: number;
    history$: Observable<BusinessmanHistory>;

    constructor(
        private activatedRoute: ActivatedRoute,
        private empHistoryService: BusinessmanHistoryService
    ) { }

    ngOnInit(): void {
        this.idEmp = this.activatedRoute.snapshot.params.idEmp;
        this.empHistoryService.getHitory(this.idEmp).subscribe(
            (data: BusinessmanHistory) => console.log(data),
            err => console.log(err)
        );
        this.getHistory();
    }

    getHistory(){
        this.history$ = this.empHistoryService.getHitory(this.idEmp);

        
    }

}
