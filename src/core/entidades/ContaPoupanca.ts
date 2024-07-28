import { Conta } from "../servicos/Conta";
import { IConta } from "./interfaces/IConta";
import { IUsuario } from "./interfaces/IUsuario";

export class ContaPoupanca extends Conta {
    taxaJuros: number;

    constructor(id: number, cliente: IUsuario, saldoInicial: number, taxaJuros: number) {
        super(id, cliente, saldoInicial);
        this.taxaJuros = taxaJuros;
    }

    realizarTransferencia(contaDestino: IConta, valor: number): boolean {
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