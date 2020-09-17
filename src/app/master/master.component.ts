import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { MasterService } from './master.service';
import { World } from '../world/world';

@Component({
    selector: 'app-master',
    templateUrl: './master.component.html',
    styleUrls: ['./master.component.scss']
})
export class MasterComponent implements OnInit {

    infoMundo$: Observable<World>;

    constructor(
        private masterService: MasterService
    ) { }

    ngOnInit(): void {
        this.infoMundo$ = this.masterService.getInfoMundo();
    }

}
