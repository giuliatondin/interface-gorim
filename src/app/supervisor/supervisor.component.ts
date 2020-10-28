import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SupervisorService } from './supervisor.service';

@Component({
    selector: 'app-supervisor',
    templateUrl: './supervisor.component.html',
    styleUrls: [ './supervisor.component.scss' ]
})
export class SupervisorComponent implements OnInit {
    
    idFis: number;

    constructor(
        private activatedRoute: ActivatedRoute,
        private fisService: SupervisorService,
        private router: Router
    ){ }

    ngOnInit(){
        this.idFis = this.activatedRoute.snapshot.params.idFis;
    }
}