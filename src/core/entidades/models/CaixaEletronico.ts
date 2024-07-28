import { ContaSpec } from '../interfaces/ContaSpec';
import { Conta } from './Conta.model';
import { Transacao } from './Transacao';

export class CaixaEletronico {
    private transacoes: Transacao[] = [];
 
    public depositar(conta: ContaSpec, valor: number): void {
        conta.depositar(valor);
    }

    public sacar(conta: ContaSpec, valor: number): boolean {
        return conta.sacar(valor);
    }

    public transferir(contaOrigem: Conta, contaDestino: Conta, valor: number): boolean {
        if (contaOrigem.transferir(contaDestino, valor)) {
            this.transacoes.push(new Transacao((this.transacoes.length + 1).toString(), contaOrigem, valor, contaDestino));
            return true;
        }
        return false;
    }

    public exibirDetalhes(conta: ContaSpec): void {
        console.log();
    }
}