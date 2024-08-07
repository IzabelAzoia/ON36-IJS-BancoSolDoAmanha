import { IBanco } from './IBanco';
import { IConta } from './IConta';
import { IUsuario } from './IUsuario';

export interface IUsuario {
    id: number;
    nome: string;
    senha: string;
    dataNascimento: Date;
    cpf: string;
    telefone: string;
    endereco: string;
    tipoUsuario: string;
    statusUsuario: string;

     
}
export class Banco implements IBanco {
    nome: string;
    clientes: IUsuario[];
    contas: IConta[];

    constructor(nome: string) {
        this.nome = nome;
        this.clientes = [];
        this.contas = [];
    }

    adicionarCliente(cliente: IUsuario): void {
        this.clientes.push(cliente);
    }

    criarConta(conta: IConta): void {
        this.contas.push(conta);
    }

    buscarClientePorId(id: number): IUsuario | undefined {
        return this.clientes.find(cliente => cliente.id === id);
    }

    buscarContaPorId(id: number): IConta | undefined {
        return this.contas.find(conta => conta.id === id);
    }

    listarClientes(): void {
        this.clientes.forEach(cliente => {
            console.log(`Cliente: ${cliente.nome}, ID: ${cliente.id}`);
        });
    }

    listarContas(): void {
        this.contas.forEach(conta => {
            console.log(`Conta ID: ${conta.id}, Cliente: ${conta.cliente.nome}, Saldo: ${conta.consultarSaldo()}`);
        });
    }
}
