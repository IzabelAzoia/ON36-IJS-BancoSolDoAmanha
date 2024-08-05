import { Conta } from '../interfaces/account.interface';
import { Transacao } from './transacao.model';

export class CaixaEletronico {
    private transacoes: Transacao[] = [];
 
    public depositar(conta: Conta, valor: number): void {
        conta.depositar(valor);
    }

    public sacar(conta: Conta, valor: number): boolean {
        return conta.sacar(valor);
    }

    public transferir(contaOrigem: Conta, contaDestino: Conta, valor: number): boolean {
        if (contaOrigem.transferir(contaDestino, valor)) {
            this.transacoes.push(new Transacao((this.transacoes.length + 1).toString(), contaOrigem, valor, contaDestino));
            return true;
        }
        return false;
    }

    public exibirDetalhes(conta: Conta): void {
        console.log();
    }
}