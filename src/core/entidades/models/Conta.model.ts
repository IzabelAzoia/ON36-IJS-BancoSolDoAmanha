import { ContaSpec } from '../interfaces/ContaSpec';
import { Cliente } from './Cliente.model'; 

export class Conta implements ContaSpec {
    id: string;
    tipo: string;
    cliente: Cliente; 
    saldo: number;

    constructor(id: string, tipo: string, cliente: Cliente, saldo: number = 0) {
        this.id = id;
        this.tipo = tipo;
        this.cliente = cliente;
        this.saldo = saldo;
    }

    depositar(valor: number): void {
        this.saldo += valor;
    }

    sacar(valor: number): boolean {
        if (this.saldo >= valor) {
            this.saldo -= valor;
            return true;
        }
        return false;
    }

    transferir(contaDestino: Conta, valor: number): boolean {
        if (this.sacar(valor)) {
            contaDestino.depositar(valor);
            return true;
        }
        return false;
    }

    consultarSaldo(): number {
        return this.saldo;
    }

    gerarExtrato(): string {
        return `Extrato da conta ${this.id}: Saldo atual ${this.saldo}`;
    }
}
