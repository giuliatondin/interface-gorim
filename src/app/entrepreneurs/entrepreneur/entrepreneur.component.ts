import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { World } from 'src/app/world/world';
import { EntrepreunersService } from '../entrepreneurs.service';
import { Entrepreneur } from './entrepreneur';

@Component({
    selector: 'app-entrepreneur',
    templateUrl: './entrepreneur.component.html',
    styleUrls: ['./entrepreneur.component.scss']
})
export class EntrepreneurComponent implements OnInit {

    infoEmp$: Observable<Entrepreneur>;
    idEmp: number;

    infoMundo$: Observable<World>;
    idJogo: number;

    // dinheiros: number;
    // poluicaoMundo: number;
    // rodada: number;
    // cidade: string;

    constructor(
        private activatedRoute: ActivatedRoute,
        private empService: EntrepreunersService
    ) { }

    ngOnInit(): void {
        this.idEmp = this.activatedRoute.snapshot.params.idEmp;
        this.idJogo = this.activatedRoute.snapshot.params.idJogo;
        console.log(this.idEmp);
        this.infoMundo$ = this.empService.getInfoMundo(this.idJogo);
        this.infoEmp$ = this.empService.getInfo(this.idEmp);
    }

}
