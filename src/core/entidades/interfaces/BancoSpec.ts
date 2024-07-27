import { Usuario } from '../models/Usuario';
import { Conta } from '../models/Conta.model';

export interface Banco {
    nome: string;
    clientes: Usuario[];
    contas: Conta[];
    buscarClientePorId(id: string): Usuario | undefined;

    adicionarCliente(cliente: Usuario): void;
    criarConta(conta: Conta): void;
    buscarClientePorId(id: string): Usuario | undefined;
    buscarContaPorId(id: string): Conta | undefined;
    listarClientes(): void;
    listarContas(): void;
}