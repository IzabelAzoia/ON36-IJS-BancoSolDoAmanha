import { Conta } from "../servicos/Conta";
import { IConta } from "./interfaces/IConta";
import { IUsuario } from "./interfaces/IUsuario";

export class ContaCorrente extends Conta {
    limiteChequeEspecial: number;

    constructor(id: number, cliente: IUsuario, saldoInicial: number, limiteChequeEspecial: number) {
        super(id, cliente, saldoInicial);
        this.limiteChequeEspecial = limiteChequeEspecial;
    }

    realizarTransferencia(contaDestino: IConta, valor: number): boolean {
        if (valor <= this.saldo + this.limiteChequeEspecial) {
            this.saldo -= valor;
            contaDestino.depositar(valor);
            return true;
        }
        return false;
    }
}