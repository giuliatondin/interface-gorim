import { Tax } from '../postForm';

export interface MayorHistory {
    nome: string;
    rodadas: Turn[];
}

export interface Turn {
    rodada: number;
    etapas: Stage[];
}

export interface Stage {
    multas: number;
    etapa: number;
    saldoAnterior: number;
    saldoAtual: number;
    poluicaoMundial: number;
    acoesAmbientais: string[];
    impostosModificados: Tax[];
    transferencias: Transfers;
    empresarios: Entrepreneur[];
    agricultores: Agriculturist[];
}

export interface Transfers {
    recebidos: Transf[];
    enviados: Transf[];
}

export interface Transf {
    nome: string;
    valor: number;
}

export interface Entrepreneur {
    imposto: number;
    produtividade: number;
    poluicao: number;
    nome: string;
    multa: number; //somente segunda etapa
}

export interface Agriculturist {
    imposto: number;
    poluicaoMedia: number;
    nome: string;
    multa: number; //somente segunda etapa
    produtividade: number;
    parcelas: Parcel[];
}

export interface Parcel {
    semente: string;
    pulverizador: boolean;
    fertilizante: string;
    maqAgr: string;
    seloVerde: boolean;
}