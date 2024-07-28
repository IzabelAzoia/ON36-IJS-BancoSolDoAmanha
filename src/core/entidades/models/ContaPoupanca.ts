import { Conta } from "./Conta.model";
import { ContaSpec } from "../interfaces/ContaSpec";
import { Cliente } from './Cliente.model';

export class ContaPoupanca extends Conta {
    taxaJuros: number;

    constructor(id: string, tipo: string, cliente: Cliente, saldoInicial: number, taxaJuros: number) {
        super(id, tipo, cliente, saldoInicial);
        this.taxaJuros = taxaJuros;
    }

    realizarTransferencia(contaDestino: ContaSpec, valor: number): boolean {
        if (valor <= this.saldo) {
            this.saldo -= valor;
            contaDestino.depositar(valor);
            return true;
        }
        return false;
    }
    aplicarJuros(): void {
        this.saldo += this.saldo * this.taxaJuros;
    }
}