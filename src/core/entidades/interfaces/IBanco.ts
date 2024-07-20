import { Usuario } from '../models/Usuario';
import { Conta } from '../../servicos/Conta';

export interface IBanco {
    nome: string;
    clientes: Usuario[];
    contas: Conta[];

    adicionarCliente(cliente: Usuario): void;
    criarConta(conta: Conta): void;
    buscarClientePorId(id: number): Usuario | undefined;
    buscarContaPorId(id: number): Conta | undefined;
    listarClientes(): void;
    listarContas(): void;
}