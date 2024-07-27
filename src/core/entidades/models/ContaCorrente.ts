import { Cliente } from './Cliente.model'; 
import { Conta } from './Conta.model';

export class ContaCorrente implements Conta  {
    id: string;
    cliente: Cliente;
    saldo: number;
    limiteSaqueDiario: number;
    taxaServicoMensal: number;
    limiteChequeEspecial: number;
    tipo: string;
    private saquesRealizadosHoje: number = 0;

    constructor(
        id: string,
        cliente: Cliente,
        saldoInicial: number = 0,
        limiteSaqueDiario: number = 0,
        taxaServicoMensal: number = 0,
        limiteChequeEspecial: number = 0,
        tipo: string = 'corrente'
    ) {
        this.id = id;
        this.cliente = cliente;
        this.saldo = saldoInicial;
        this.limiteSaqueDiario = limiteSaqueDiario;
        this.taxaServicoMensal = taxaServicoMensal;
        this.limiteChequeEspecial = limiteChequeEspecial;
        this.tipo = tipo;
    }
    depositar(valor: number): void {
        this.saldo += valor;
    }

    sacar(valor: number): boolean {
        if (this.saquesRealizadosHoje >= this.limiteSaqueDiario) {
            console.log("Limite de saques diários excedido.");
            return false;
        }

        if (valor <= this.saldo + this.limiteChequeEspecial) {
            this.saldo -= valor;
            this.saquesRealizadosHoje += 1;
            return true;
        }
        return false;
    }

    transferir(contaDestino: Conta, valor: number): boolean {
        if (this.sacar(valor)) {
            contaDestino.depositar(valor);
            return true;
        }
        return false;
    }

    consultarSaldo(): number {
        return this.saldo;
    }

    gerarExtrato(): string { // Ajuste o tipo de retorno
        return `Extrato da conta ${this.id}: Saldo atual ${this.saldo}`;
    }

    calcularTaxaServico(): void {
        this.saldo -= this.taxaServicoMensal;
        console.log(`Taxa de serviço mensal de ${this.taxaServicoMensal} aplicada. Saldo atual: ${this.saldo}`);
    }

    resetarSaquesDiarios(): void {
        this.saquesRealizadosHoje = 0;
    }
}