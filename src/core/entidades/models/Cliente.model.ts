import { Conta } from './Conta.model';
import { UsuarioSpec } from '../interfaces/UsuarioSpec';

export class Cliente implements UsuarioSpec {
    id: string;
    nome: string;
    senha: string;
    dataNascimento: Date;
    cpf: string;
    telefone: string;
    endereco: string;
    tipoUsuario: string;
    statusUsuario: string;
    contas: Conta[] = [];
    gerente: string;

    constructor(id: string, nome: string, senha: string, dataNascimento: Date, cpf: string, telefone: string, endereco: string, gerente: string) {
        this.id = id;
        this.nome = nome;
        this.senha = senha;
        this.dataNascimento = dataNascimento;
        this.cpf = cpf;
        this.telefone = telefone;
        this.endereco = endereco;
        this.tipoUsuario = 'cliente';
        this.statusUsuario = 'ativo';
        this.gerente = gerente;
    }

    abrirConta(conta: Conta) {
        this.contas.push(conta);
    }

    fecharConta(contaId: string) {
        this.contas = this.contas.filter(c => c.id !== contaId);
    }

    modificarTipoDeConta(contaId: string, novaConta: Conta) {
        const index = this.contas.findIndex(c => c.id === contaId);
        if (index !== -1) {
            this.contas[index] = novaConta;
        }
    }

    consultarDados(): void {
        console.log(`Nome: ${this.nome}, Endereço: ${this.endereco}, Telefone: ${this.telefone}`);
    }

    exibirGerente(): void {
        console.log(`Gerente responsável: ${this.gerente}`);
    }
}
 