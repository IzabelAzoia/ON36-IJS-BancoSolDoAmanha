import { ContaSpec } from './ContaSpec';

export interface Transacao {
    id: string;
    contaOrigem: ContaSpec;
    contaDestino: ContaSpec | null;
    valor: number;
    data: Date;

    registrar(): void;
    descricao(): string;
    getId(): number;
    getData(): Date;
}