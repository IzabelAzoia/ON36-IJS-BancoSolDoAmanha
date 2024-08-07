import { IConta } from '../entidades/interfaces/IConta';
import { IUsuario } from '../entidades/interfaces/IUsuario';

export class Conta implements IConta {
    id: number;
    cliente: IUsuario;
    saldo: number;

    constructor(id: number, cliente: IUsuario, saldo: number = 0) {
        this.id = id;
        this.cliente = cliente;
        this.saldo = saldo;
    }

    depositar(valor: number): void {
        this.saldo += valor;
    }

    sacar(valor: number): boolean {
        if (valor > this.saldo) {
            return false;
        }
        this.saldo -= valor;
        return true;
    }

    transferir(contaDestino: IConta, valor: number): boolean {
        if (this.sacar(valor)) {
            contaDestino.depositar(valor);
            return true;
        }
        return false;
    }

    consultarSaldo(): number {
        return this.saldo;
    }

    gerarExtrato(): void {
        console.log(`Extrato da conta ${this.id}: Saldo atual ${this.saldo}`);
    }
}