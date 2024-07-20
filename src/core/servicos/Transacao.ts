import { ITransacao } from '../entidades/interfaces/ITransacao'; 
import { Conta } from './Conta';

export class Transacao implements ITransacao {
    id: number;
    contaOrigem: Conta; // Use Conta se for uma classe
    contaDestino: Conta | null; // Use Conta se for uma classe
    valor: number;
    data: Date;

    constructor(id: number, contaOrigem: Conta, valor: number, contaDestino: Conta | null = null) {
        this.id = id;
        this.contaOrigem = contaOrigem;
        this.contaDestino = contaDestino;
        this.valor = valor;
        this.data = new Date();
    }

    registrar(): void {
        console.log(`Transação registrada: ${this.data.toLocaleString()} - ${this.descricao()}`);
    }

    descricao(): string {
        if (this.contaDestino) {
            return `Transferência de ${this.valor} de ${this.contaOrigem.cliente.nome} para ${this.contaDestino.cliente.nome}`;
        } else {
            return `Saque de ${this.valor} na conta de ${this.contaOrigem.cliente.nome}`;
        }
    }

    getId(): number {
        return this.id;
    }

    getData(): Date {
        return this.data;
    }
}