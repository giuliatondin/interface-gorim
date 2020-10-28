import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AldermanService } from './alderman.service';

@Component({
    selector: 'app-alderman',
    templateUrl: './alderman.component.html',
    styleUrls: [ './alderman.component.scss' ]
})
export class AldermanComponent implements OnInit {
    
    idVer: number;
    
    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private verService: AldermanService
    ){ }

    ngOnInit(){
        this.idVer = this.activatedRoute.snapshot.params.idVer;
    }
}