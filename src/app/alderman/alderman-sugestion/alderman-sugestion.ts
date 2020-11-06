import { Tax } from '../../mayor/postForm';

export interface AldermanSugestion {
    imposto: Tax;
    acaoAmbiental: string;
    tipoSugestao: number;
    aceito: boolean;
    idSugestao: number;
}