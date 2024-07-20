import { IConta } from './IConta';

export interface ITransacao {
    id: number;
    contaOrigem: IConta;
    contaDestino: IConta | null;
    valor: number;
    data: Date;

    registrar(): void;
    descricao(): string;
    getId(): number;
    getData(): Date;
}