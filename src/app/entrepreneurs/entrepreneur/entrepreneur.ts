import { Person } from '../../world/person';
export interface Entrepreneur extends Person {
    // id: number;
    // nome: string;
    // cidade: string;
    // saldo: number;
    setor: string;
    poluicao: number;
    produtividade: number;
    imposto: number;
    multa: number;
    produtos: Array<string>;
}
