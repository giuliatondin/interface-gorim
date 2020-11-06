import { Person } from '../world/models/person';

export interface Supervisor extends Person{
    idEleito: number;
    pedidos: string[];
}