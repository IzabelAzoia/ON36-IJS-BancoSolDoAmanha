import { IUsuario } from '../interfaces/IUsuario';
import { Cliente } from './Cliente';  
import { ContaCorrente } from '../ContaCorrente';
import { ContaPoupanca } from '../ContaPoupanca';

export class GerenteContas implements IUsuario {
    id: number;
    nome: string;
    senha: string;
    dataNascimento: Date;
    cpf: string;
    telefone: string;
    endereco: string;
    tipoUsuario: string = 'Gerente';
    statusUsuario: string;

    constructor(
        id: number,
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
    cadastrarUsuario(usuario: IUsuario): void {        
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

    consultarDados(): void {
        console.log(`Nome: ${this.nome}, Endereço: ${this.endereco}, Telefone: ${this.telefone}`);
    } 
    criarContaCorrente(id: number, cliente: IUsuario, saldo: number, limiteChequeEspecial: number): ContaCorrente {
        return new ContaCorrente(id, cliente, saldo, limiteChequeEspecial);
    }

    criarContaPoupanca(id: number, cliente: IUsuario, saldo: number, taxaJuros: number): ContaPoupanca {
        return new ContaPoupanca(id, cliente, saldo, taxaJuros);
    }
    excluirConta(usuario: IUsuario): void {

    }

}