import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MayorService } from './mayor.service';

@Component({
    selector: 'app-mayor',
    templateUrl: './mayor.component.html',
    styleUrls: [ './mayor.component.scss' ]
})
export class MayorComponent implements OnInit {
    
    idPref: number;

    constructor(
        private prefService: MayorService,
        private activatedRoute: ActivatedRoute,
        private router: Router
    ){ }

    ngOnInit(){
        this.idPref = this.activatedRoute.snapshot.params.idPref;
    }
}