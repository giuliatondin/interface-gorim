import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { World } from 'src/app/world/world';
import { AgriculturistsService } from '../agriculturists.service';
import { Agriculturist } from './agriculturist';

@Component({
    selector: 'app-agriculturist',
    templateUrl: './agriculturist.component.html',
    styleUrls: ['./agriculturist.component.scss']
})
export class AgriculturistComponent implements OnInit {

    infoAgr$: Observable<Agriculturist>;
    idPersonagem: number;

    existProducts = true;

    infoMundo$: Observable<World>;
    idJogo: number;

    constructor(
        private activatedRoute: ActivatedRoute,
        private agrService: AgriculturistsService
    ) { }

    ngOnInit(): void {
        this.idPersonagem = this.activatedRoute.snapshot.params.idPersonagem;
        this.idJogo = this.activatedRoute.snapshot.params.idJogo;
        console.log(this.idPersonagem);
        this.infoMundo$ = this.agrService.getInfoMundo(this.idJogo);
        this.infoAgr$ = this.agrService.getInfo(this.idPersonagem);
    }

}
