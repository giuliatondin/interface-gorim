export interface AldermanHistory {
    nome: string;
    rodadas: Turn[];
}

export interface Turn {
    produtividade: number;
    saldoAnterior: number;
    imposto: number;
    multa: number;
    saldoAtual: number;
    poluicaoCausadaMundo: number;
    poluicaoPessoal: number;
    poluicaoMundial: number;
    transferencias: Transfers;
    acoesUtilizadas: string[];
}

export interface Transfers {
    recebidos: Transf[];
    enviados: Transf[];
}

export interface Transf {
    nome: string;
    valor: number;
}