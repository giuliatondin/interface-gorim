import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { MasterService } from './master.service';
import { World } from '../world/world';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-master',
    templateUrl: './master.component.html',
    styleUrls: ['./master.component.scss']
})
export class MasterComponent implements OnInit {

    infoMundo$: Observable<World>;
    mundo: World;

    constructor(
        private masterService: MasterService,
        private activatedRoute: ActivatedRoute
    ) { }

    ngOnInit(): void {
        this.infoMundo$ = this.masterService
            .getInfoMundo(this.activatedRoute.snapshot.params.idJogo);
        //console.log(this.mundo.quantidadeJogadores);
    }

}
