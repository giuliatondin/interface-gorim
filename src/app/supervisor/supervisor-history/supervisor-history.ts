export interface SupervisorHistory {
    nome: string;
    rodadas: Turn[];
}

export interface Turn {
    rodada: number;
    etapas: Stage[];
}

export interface Stage {
    etapa: number;
    saldoAnterior: number;
    saldoAtual: number;
    poluicaoMundial: number;
    transferencias: Transfers;
    empresarios: Entrepreneur[];
    agricultores: Agriculturist[];
}

export interface Entrepreneur {
    produtividade: number;
    poluicao: number;
    nome: string;
    multa: number; //somente segunda etapa
}

export interface Agriculturist {
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

export interface Transfers {
    recebidos: Transf[];
    enviados: Transf[];
}

export interface Transf {
    nome: string;
    valor: number;
}