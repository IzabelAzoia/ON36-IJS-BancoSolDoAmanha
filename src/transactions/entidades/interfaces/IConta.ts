import { IUsuario } from './IUsuario';

export interface IConta {
    id: number;
    cliente: IUsuario;
    saldo: number;

    depositar(valor: number): void;
    sacar(valor: number): boolean;
    transferir(contaDestino: IConta, valor: number): boolean;
    consultarSaldo(): number;
    gerarExtrato(): void;
}