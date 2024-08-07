import { IConta } from '../entidades/interfaces/IConta';
import { IUsuario } from '../entidades/interfaces/IUsuario';

export abstract class Conta implements IConta {
    id: number;
    cliente: IUsuario;
    saldo: number;

    constructor(id: number, cliente: IUsuario, saldo: number) {
        this.id = id;
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
        console.log(`Conta ID: ${this.id}, Saldo: ${this.saldo}`);
    }
}
