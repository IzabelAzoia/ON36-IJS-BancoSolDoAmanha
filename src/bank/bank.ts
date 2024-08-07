import { UserInterface } from '../../SEmnome/interfaces/user.interface';

export abstract class Conta implements Conta {
    id: string;
    cliente: UserInterface;
    saldo: number;

    constructor(id: string, cliente: UserInterface, saldo: number) {
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

    gerarExtrato(): void {
        console.log(`Conta ID: ${this.id}, Saldo: ${this.saldo}`);
    }
}
