import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatRadioChange } from '@angular/material/radio';
import { Router } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import { AlertService } from 'src/app/world/alert/alert.service';

import { Produto } from 'src/app/world/models/produto';
import { ProdutoSimplified } from 'src/app/world/models/produto.simplified';
import { ProdutoService } from '../produto.service';
import { WebStorageService } from '../../world/web-storage/webstorage.service';
import { Parcel, Prod } from './parcel';
import { ParcelService } from './parcel.service';
import { PostForm } from './postForm';

@Component({
    selector: 'app-parcel',
    templateUrl: './parcel.component.html',
    styleUrls: ['./parcel.component.scss']
})
export class ParcelComponent implements OnInit {

    @Input() rodada: number;

    @Input() idAgr: number;
    @Input() idJogo: number;

    parcelasForm: FormGroup;

    quantidades = [];
    @Input() produtos: ProdutoSimplified[];

    checkedButtons = [];
    pedirSeloVerde: boolean;
    liberaBotao: boolean;

    percentDone: number = 0;
    
    counter = interval(10 * 1000);
    subscription: Subscription;

    inLineAlertButton: string = 'Nem todos os jogadores começaram o jogo ainda. Aguarde para finalizar a jogada.';

    constructor(
        private produtoService: ProdutoService,
        private formBuilder: FormBuilder,
        private webStorageService: WebStorageService,
        private parcelService: ParcelService,
        private router: Router,
        private alertService: AlertService
    ) { }

    ngOnInit(): void {
        this.liberaBotao = false;

        this.iniciaArrays();

        this.produtoService.sharedProdutos.subscribe(
            (produto: Produto) => {
                if(produto != null){
                    if(produto.nome != ""){
                        this.quantidades[produto.id-1][produto.preco] += produto.quantidade;
                        this.webStorageService.setData('agr'+ this.idAgr + 'ParcelQuantidades', this.quantidades);
                    }
                }
            },
            err => console.log(err)
        );

        this.parcelasForm = this.formBuilder.group({
            seloVerde: [this.pedirSeloVerde, Validators.required],
            parcela1: this.formBuilder.group({
                sementeP1: [
                    (this.checkedButtons[0][0] == 0) ? 'none' : Math.floor(this.checkedButtons[0][0]/10).toString(),
                    Validators.required
                ],
                fertilizanteP1: [
                    (this.checkedButtons[0][1] == 0) ? 'none' : Math.floor(this.checkedButtons[0][1]/10).toString(),
                    Validators.required
                ],
                maquinaP1: [
                    (this.checkedButtons[0][2] != 0 && this.checkedButtons[0][2] < 100) ? Math.floor(this.checkedButtons[0][2]/10).toString() : 'none',
                    Validators.required
                ],
                pulverizadorP1: [
                    (this.checkedButtons[0][2] != 0 && this.checkedButtons[0][2] > 100) ? Math.floor(this.checkedButtons[0][2]/10).toString() : 'none',
                    Validators.required
                ],
                agrotoxicoP1: [
                    (this.checkedButtons[0][3] == 0) ? 'none' : Math.floor(this.checkedButtons[0][3]/10).toString(),
                    Validators.required
                ]
            }),
            parcela2: this.formBuilder.group({
                sementeP2: [
                    (this.checkedButtons[1][0] == 0) ? 'none' : Math.floor(this.checkedButtons[1][0]/10).toString(),
                    Validators.required
                ],
                fertilizanteP2: [
                    (this.checkedButtons[1][1] == 0) ? 'none' : Math.floor(this.checkedButtons[1][1]/10).toString(),
                    Validators.required
                ],
                maquinaP2: [
                    (this.checkedButtons[1][2] != 0 && this.checkedButtons[1][2] < 100) ? Math.floor(this.checkedButtons[1][2]/10).toString() : 'none',
                    Validators.required
                ],
                pulverizadorP2: [
                    (this.checkedButtons[1][2] != 0 && this.checkedButtons[1][2] > 100) ? Math.floor(this.checkedButtons[1][2]/10).toString() : 'none',
                    Validators.required
                ],
                agrotoxicoP2: [
                    (this.checkedButtons[1][3] == 0) ? 'none' : Math.floor(this.checkedButtons[1][3]/10).toString(),
                    Validators.required
                ]
            }),
            parcela3: this.formBuilder.group({
                sementeP3: [
                    (this.checkedButtons[2][0] == 0) ? 'none' : Math.floor(this.checkedButtons[2][0]/10).toString(),
                    Validators.required
                ],
                fertilizanteP3: [
                    (this.checkedButtons[2][1] == 0) ? 'none' : Math.floor(this.checkedButtons[2][1]/10).toString(),
                    Validators.required
                ],
                maquinaP3: [
                    (this.checkedButtons[2][2] != 0 && this.checkedButtons[2][2] < 100) ? Math.floor(this.checkedButtons[2][2]/10).toString() : 'none',
                    Validators.required
                ],
                pulverizadorP3: [
                    (this.checkedButtons[2][2] != 0 && this.checkedButtons[2][2] > 100) ? Math.floor(this.checkedButtons[2][2]/10).toString() : 'none',
                    Validators.required
                ],
                agrotoxicoP3: [
                    (this.checkedButtons[2][3] == 0) ? 'none' : Math.floor(this.checkedButtons[2][3]/10).toString(),
                    Validators.required
                ]
            }),
            parcela4: this.formBuilder.group({
                sementeP4: [
                    (this.checkedButtons[3][0] == 0) ? 'none' : Math.floor(this.checkedButtons[3][0]/10).toString(),
                    Validators.required
                ],
                fertilizanteP4: [
                    (this.checkedButtons[3][1] == 0) ? 'none' : Math.floor(this.checkedButtons[3][1]/10).toString(),
                    Validators.required
                ],
                maquinaP4: [
                    (this.checkedButtons[3][2] != 0 && this.checkedButtons[3][2] < 100) ? Math.floor(this.checkedButtons[3][2]/10).toString() : 'none',
                    Validators.required
                ],
                pulverizadorP4: [
                    (this.checkedButtons[3][2] != 0 && this.checkedButtons[3][2] > 100) ? Math.floor(this.checkedButtons[3][2]/10).toString() : 'none',
                    Validators.required
                ],
                agrotoxicoP4: [
                    (this.checkedButtons[3][3] == 0) ? 'none' : Math.floor(this.checkedButtons[3][3]/10).toString(),
                    Validators.required
                ]
            }),
            parcela5: this.formBuilder.group({
                sementeP5: [
                    (this.checkedButtons[4][0] == 0) ? 'none' : Math.floor(this.checkedButtons[4][0]/10).toString(),
                    Validators.required
                ],
                fertilizanteP5: [
                    (this.checkedButtons[4][1] == 0) ? 'none' : Math.floor(this.checkedButtons[4][1]/10).toString(),
                    Validators.required
                ],
                maquinaP5: [
                    (this.checkedButtons[4][2] != 0 && this.checkedButtons[4][2] < 100) ? Math.floor(this.checkedButtons[4][2]/10).toString() : 'none',
                    Validators.required
                ],
                pulverizadorP5: [
                    (this.checkedButtons[4][2] != 0 && this.checkedButtons[4][2] > 100) ? Math.floor(this.checkedButtons[4][2]/10).toString() : 'none',
                    Validators.required
                ],
                agrotoxicoP5: [
                    (this.checkedButtons[4][3] == 0) ? 'none' : Math.floor(this.checkedButtons[4][3]/10).toString(),
                    Validators.required
                ]
            }),
            parcela6: this.formBuilder.group({
                sementeP6: [
                    (this.checkedButtons[5][0] == 0) ? 'none' : Math.floor(this.checkedButtons[5][0]/10).toString(),
                    Validators.required
                ],
                fertilizanteP6: [
                    (this.checkedButtons[5][1] == 0) ? 'none' : Math.floor(this.checkedButtons[5][1]/10).toString(),
                    Validators.required
                ],
                maquinaP6: [
                    (this.checkedButtons[5][2] != 0 && this.checkedButtons[5][2] < 100) ? Math.floor(this.checkedButtons[5][2]/10).toString() : 'none',
                    Validators.required
                ],
                pulverizadorP6: [
                    (this.checkedButtons[5][2] != 0 && this.checkedButtons[5][2] > 100) ? Math.floor(this.checkedButtons[5][2]/10).toString() : 'none',
                    Validators.required
                ],
                agrotoxicoP6: [
                    (this.checkedButtons[5][3] == 0) ? 'none' : Math.floor(this.checkedButtons[5][3]/10),
                    Validators.required
                ]
            }),
        });

        this.verificaFimEtapa();
    }

    iniciaArrays(){
        this.quantidades = (this.webStorageService.hasData('agr'+ this.idAgr + 'ParcelQuantidades')) ?
            this.webStorageService.getData('agr'+ this.idAgr + 'ParcelQuantidades') as number[] :
            [
                //  [b, m, a]
                    [0, 0, 0], // hortalica
                    [0, 0, 0], // arroz
                    [0, 0, 0], // soja
                    [0, 0, 0], // f comum
                    [0, 0, 0], // f premium
                    [0, 0, 0], // f super premium
                    [0, 0, 0], // pacote 1
                    [0, 0, 0], // pacote 2
                    [0, 0, 0], // pacote 3
                    [0, 0, 0], // pulverizador
                    [0, 0, 0], // a comum
                    [0, 0, 0], // a premium
                    [0, 0, 0]  // a super premium
            ];
        
        this.checkedButtons = (this.webStorageService.hasData('agr'+ this.idAgr + 'ParcelCheckedButtons')) ?
            this.webStorageService.getData('agr'+ this.idAgr + 'ParcelCheckedButtons') as number[] :
            [
                [0, 0, 0, 0], // p1
                [0, 0, 0, 0], // p2
                [0, 0, 0, 0], // p3
                [0, 0, 0, 0], // p4
                [0, 0, 0, 0], // p5
                [0, 0, 0, 0]  // p6
            ];

        this.pedirSeloVerde = (this.webStorageService.hasData('agr'+ this.idAgr + 'ParcelPedirSeloVerde')) ?
            this.webStorageService.getData('agr'+ this.idAgr + 'ParcelPedirSeloVerde') as boolean :
            false;
        
        this.webStorageService.setData('agr'+ this.idAgr + 'ParcelCheckedButtons', this.checkedButtons);
        this.webStorageService.setData('agr'+ this.idAgr + 'ParcelQuantidades', this.quantidades);
        this.webStorageService.setData('agr'+ this.idAgr + 'ParcelPedirSeloVerde', this.pedirSeloVerde);
    }

    getIndiceProduto(idEmp: number, idProduto: number){
        if(idEmp < 3) return (idEmp - 1)
        else if(idProduto == 10) return 3
        else return 2;
    }

    contaQuantidade(parcela: number, indice: number, event: MatRadioChange){
        if(this.checkedButtons[parcela-1][indice] != 0) {
            let idProdAntigo : number;
            let precoAntigo : number;
            precoAntigo = this.checkedButtons[parcela-1][indice]%10;
            idProdAntigo = Math.floor(this.checkedButtons[parcela-1][indice]/10);

            this.checkedButtons[parcela-1][indice] = 0;
            this.quantidades[idProdAntigo-1][precoAntigo]++;
        }

        if(event.value != "none"){
            const idProd = event.value;
    
            let aux = idProd*10;
            let preco;
            
            if(this.quantidades[idProd-1][0] != 0) preco = 0;
            else if(this.quantidades[idProd-1][1] != 0) preco = 1;
            else if(this.quantidades[idProd-1][2] != 0) preco = 2;

            this.quantidades[idProd-1][preco]--;
            aux += preco;

            this.checkedButtons[parcela-1][indice] = aux;
        }

        this.webStorageService.setData('agr'+ this.idAgr + 'ParcelCheckedButtons', this.checkedButtons);
        this.webStorageService.setData('agr'+ this.idAgr + 'ParcelQuantidades', this.quantidades);
    }

    changePedirSeloVerde(event: MatCheckboxChange){
        this.pedirSeloVerde = event.checked;
        this.webStorageService.setData('agr'+ this.idAgr + 'ParcelPedirSeloVerde', this.pedirSeloVerde);
    }

    verificaFimEtapa(){
        this.subscription = this.counter
            .pipe(
                flatMap(
                    () => this.parcelService.verificaFimEtapa(this.idJogo, 1)
                )
            )
            .subscribe(
                (data: number) => {
                    console.log(data);
                    if (data == 3) this.finalizarJogada(true, true);
                    else if(data > 2) {
                        this.liberaBotao = true;
                        this.inLineAlertButton = '';
                    }
                    else if(data == 0) this.finalizarJogada(true);
                },
                err => console.log(err)
            );
    }

    hasUnsetProducts(){
        let temProdutos = false;
        this.quantidades.forEach(
            produto => {
                if((produto[0] || produto[1] || produto[2]) != 0){
                    temProdutos = true;
                }
            }
        );
        return temProdutos;
    }

    finalizarJogada(finishedByMaster: boolean = false, gameover: boolean = false){
        if(
            (
                !this.hasUnsetProducts() &&
                (this.webStorageService.getData(this.idAgr + 'voting') != true) 
            ) ||
            finishedByMaster
        ){
            let parcelas: Parcel[] = [];
            this.checkedButtons.forEach(
                parcela => {

                    let produtos: Prod[] = [];
                    parcela.forEach(
                        produto => {
                            produtos.push({
                                id: Math.floor(produto/10),
                                preco: produto%10
                            })
                        }
                    );

                    const parcel: Parcel = {
                        produtos: produtos
                    };

                    parcelas.push(parcel);
                }
            );

            
            let postForm: PostForm = {
                parcelas: parcelas,
                seloVerde: this.parcelasForm.getRawValue().seloVerde
            };
            
            if (!gameover){
                this.parcelService.postAgricultiristForm(this.idJogo, this.idAgr, postForm)
                    .subscribe(
                        () => {
                            this.subscription.unsubscribe();
                            this.webStorageService.removeData([
                                'agr'+ this.idAgr + 'ParcelCheckedButtons',
                                'agr'+ this.idAgr + 'VendaQuantidadeProdutos',
                                'agr'+ this.idAgr + 'ParcelPedirSeloVerde',
                                'agr'+ this.idAgr + 'ParcelQuantidades',
                                this.idAgr + 'voting'
                            ]);
                                if(finishedByMaster) this.alertService.warning('Jogada finalizada pelo Mestre.', true);
                                else this.alertService.success('Jogada finalizada.', true);
                                this.router.navigate([this.idJogo, 'waitingPage', this.idAgr], { replaceUrl: true });
                        },
                        err => {
                            console.log(err);
                            this.alertService.danger('Algo deu errado. Por favor, tente novamente.');
                        }
                    );
            }
            else{
                this.alertService.warning('O jogo terminou', true);
                this.router.navigate([this.idJogo, 'gameover']);
            }
        }
        else {
            if(this.hasUnsetProducts())
                this.inLineAlertButton = 'É preciso colocar todos os produtos comprados em parcelas antes de terminar a etapa.';
            else if(this.webStorageService.getData(this.idAgr + 'voting') == false)
                this.inLineAlertButton = 'É preciso votar para terminar a etapa.';
        }

    }
}
