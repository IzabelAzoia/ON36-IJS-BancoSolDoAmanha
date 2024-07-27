 
import { Conta } from './Conta.model';

export class Transacao implements Transacao {
    id: string;
    contaOrigem: Conta;
    contaDestino: Conta | null;
    valor: number;
    data: Date;

    constructor(id: string, contaOrigem: Conta, valor: number, contaDestino: Conta | null = null) {
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

    getId(): string {
        return this.id;
    }

    getData(): Date {
        return this.data;
    }
}