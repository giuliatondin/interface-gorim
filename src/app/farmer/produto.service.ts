import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Produto } from '../world/models/produto';

@Injectable()
export class ProdutoService {
    
    private produto = new BehaviorSubject<Produto>({
        id: 0,
        nome: "",
        preco: 0,
        tipo: 0,
        quantidade: 0
    });
    sharedProdutos = this.produto.asObservable();

    constructor() {}

    nextProduto(produto: Produto) {
        this.produto.next(produto)
    }
}