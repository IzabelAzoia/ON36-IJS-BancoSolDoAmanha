import { Cliente } from '../models/Cliente.model'; 

export interface ContaSpec {
    id: string;
    cliente: Cliente;
    saldo: number;
    tipo: string;
    depositar(valor: number): void;
    sacar(valor: number): boolean;
    transferir(contaDestino: ContaSpec, valor: number): boolean;
    consultarSaldo(): number;
    gerarExtrato(): string;
}