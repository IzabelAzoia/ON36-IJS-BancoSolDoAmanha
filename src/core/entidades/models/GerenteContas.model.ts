import { UsuarioSpec } from '../interfaces/UsuarioSpec';
import { Cliente } from './Cliente.model';  
import { ContaCorrente } from './ContaCorrente';
import { ContaPoupanca } from './ContaPoupanca';
import { Conta } from './Conta.model';

export class GerenteContas implements UsuarioSpec {
    id: string;
    nome: string;
    senha: string;
    dataNascimento: Date;
    cpf: string;
    telefone: string;
    endereco: string;
    tipoUsuario: string = 'Gerente';
    statusUsuario: string;
    clientes: Cliente[] = [];

    constructor(
        id: string,
        nome: string,
        senha: string,
        dataNascimento: Date,
        cpf: string,
        telefone: string,
        endereco: string,
        statusUsuario: string
    ) {
        this.id = id;
        this.nome = nome;
        this.senha = senha;
        this.dataNascimento = dataNascimento;
        this.cpf = cpf;
        this.telefone = telefone;
        this.endereco = endereco;
        this.statusUsuario = statusUsuario;
    }

    adicionarCliente(cliente: Cliente): void {
        this.clientes.push(cliente);
    }

    removerCliente(clienteId: string): void {
        this.clientes = this.clientes.filter(c => c.id !== clienteId);
    }

    encontrarCliente(clienteId: string): Cliente | undefined {
        return this.clientes.find(cliente => cliente.id === clienteId);
    }

    abrirContaParaCliente(clienteId: string, conta: Conta): void {
        const cliente = this.encontrarCliente(clienteId);
        if (cliente) {
            cliente.abrirConta(conta);
        }
    }

    fecharContaParaCliente(clienteId: string, contaId: string): void {
        const cliente = this.encontrarCliente(clienteId);
        if (cliente) {
            cliente.fecharConta(contaId);
        }
    }

    modificarTipoDeContaParaCliente(clienteId: string, contaId: string, novaConta: Conta): void {
        const cliente = this.encontrarCliente(clienteId);
        if (cliente) {
            cliente.modificarTipoDeConta(contaId, novaConta);
        }
    }

    cadastrarUsuario(usuario: UsuarioSpec): void {
         console.log(`Usuário ${usuario.nome} cadastrado com sucesso.`);
    }

    autenticarUsuario(senha: string): boolean {
        return this.senha === senha;
    }

    atualizarUsuario(novoNome: string, novoEndereco: string, novoTelefone: string, novaSenha: string): void {
        this.nome = novoNome;
        this.endereco = novoEndereco;
        this.telefone = novoTelefone;
        this.senha = novaSenha;
    }

    consultarDados(): string {
        return `Nome: ${this.nome}, Endereço: ${this.endereco}, Telefone: ${this.telefone}`;
    } 

    criarContaCorrente(id: string, cliente: Cliente, saldo: number, limiteChequeEspecial: number): ContaCorrente {
        return new ContaCorrente(id, cliente, saldo, limiteChequeEspecial);
    }

    criarContaPoupanca(id: string, cliente: Cliente, saldo: number, taxaJuros: number): ContaPoupanca {
        return new ContaPoupanca(id, 'Poupanca', cliente, saldo, taxaJuros);
    }

    excluirConta(contaId: string): void {
    }
}
