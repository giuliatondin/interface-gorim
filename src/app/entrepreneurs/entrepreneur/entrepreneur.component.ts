import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { World } from 'src/app/world/world';
import { EntrepreunersService } from '../entrepreneurs.service';
import { PersonSimplified } from '../../world/models/person.simplified';
import { Entrepreneur } from './entrepreneur';
import { ProdutoSimplified } from 'src/app/world/models/produto.simplified';

@Component({
    selector: 'app-entrepreneur',
    templateUrl: './entrepreneur.component.html',
    styleUrls: ['./entrepreneur.component.scss']
})
export class EntrepreneurComponent implements OnInit {

    infoEmp$: Observable<Entrepreneur>;
    idEmp: number;
    emp: Entrepreneur;

    infoMundo$: Observable<World>;
    idJogo: number;

    nomeAgricultores: PersonSimplified[];
    produtos: ProdutoSimplified[] = [];

    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private empService: EntrepreunersService
    ) { }

    ngOnInit(): void {
        this.idEmp = this.activatedRoute.snapshot.params.idEmp;
        this.empService.getInfo(this.idEmp)
            .subscribe(
                (data: Entrepreneur) => {
                    this.emp = data;

                    this.idJogo = this.activatedRoute.snapshot.params.idJogo;
                    this.infoMundo$ = this.empService.getInfoMundo(this.idJogo);
                    this.arrumaProdutos();
                }
            );

        this.empService.getInfoAgricultores()
            .subscribe(
                (data: PersonSimplified[]) => {
                    this.nomeAgricultores = data;
                }
            );
    }

    arrumaProdutos(){
        this.emp.produtos.forEach(
            prod => {
                let aux: ProdutoSimplified = {
                    tipo: prod["tipo"],
                    custo: prod["custo"],
                    setor: this.emp.setor
                }
                this.produtos.push(aux);
            }
        );
    }

    finalizaJogada(){
        this.empService.finalizaJogada(this.idEmp)
            .subscribe(
                () => {
                    console.log("Finalizadooooo");
                    this.router.navigate([this.idJogo, 'waitingPage', this.idEmp]);
                },
                err => console.log(err)
            );
        
    }

}
