import { Conta } from'../models/conta-classe.model';
import { ContaFactory } from './account.factory';
import { Cliente } from '../models/client.model';

export class ContaCorrenteFactory implements ContaFactory {
    criarConta(id: string, cliente: Cliente, saldo: number = 0): Conta {
        return new Conta(id, 'corrente', cliente, saldo);
    }
}