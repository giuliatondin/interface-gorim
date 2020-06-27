import { Person } from '../../world/person';
export interface Agriculturist extends Person {
    qtdParcelas: number;
    idParcelaInicio: number;
    produtividade: number;
    poluicao: number;
    imposto: number;
    multa: number;
    gastos: number;
}
