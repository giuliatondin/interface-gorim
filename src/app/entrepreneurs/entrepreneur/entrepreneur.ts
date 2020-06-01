import { Person } from '../../world/person';
export interface Entrepreneur extends Person {
    setor: string;
    poluicao: number;
    produtividade: number;
    imposto: number;
    multa: number;
    produtos: Array<string>;
}
