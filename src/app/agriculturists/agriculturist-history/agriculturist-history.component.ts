import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AgriculturistHistory } from './agriculturist-history';
import { AgriculturistHistoryService } from './agriculturist-history.service';

@Component({
    selector: 'app-agriculturist-history',
    templateUrl: './agriculturist-history.component.html',
    styleUrls: ['./agriculturist-history.component.scss']
})
export class AgriculturistHistoryComponent implements OnInit {

    idAgr: number;
    history$: Observable<AgriculturistHistory>;

    constructor(
        private activatedRoute: ActivatedRoute,
        private agrHistoryService: AgriculturistHistoryService
    ){ }

    ngOnInit(): void {
        this.idAgr = this.activatedRoute.snapshot.params.idAgr;
        this.getHistory();
    }

    getHistory(){
        this.history$ = this.agrHistoryService.getHistory(this.idAgr);
        // this.agrHistoryService.getHistory(this.idAgr)
        //     .subscribe(
        //         (data: AgriculturistHistory) => {
        //             console.log(data);
        //         },
        //         err => console.log(err)
        //     );
    }

    isMaquina(produto: string){
        if(produto.includes("comum") || produto.includes("premium")) return false;
        return true;
    }

}
