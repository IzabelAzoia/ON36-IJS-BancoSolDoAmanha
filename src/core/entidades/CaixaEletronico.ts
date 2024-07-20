import { IConta } from '../entidades/interfaces/IConta';
import { Transacao } from '../servicos/Transacao';

export class CaixaEletronico {
    private transacoes: Transacao[] = [];
 
    public depositar(conta: IConta, valor: number): void {
        conta.depositar(valor);
    }

    public sacar(conta: IConta, valor: number): boolean {
        return conta.sacar(valor);
    }

    public transferir(contaOrigem: IConta, contaDestino: IConta, valor: number): boolean {
        if (contaOrigem.transferir(contaDestino, valor)) {
            this.transacoes.push(new Transacao(this.transacoes.length + 1, contaOrigem, valor, contaDestino));
            return true;
        }
        return false;
    }

    public exibirDetalhes(conta: IConta): void {
        console.log();
    }
}