import { Person } from '../world/models/person';
export interface Businessman extends Person {
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
