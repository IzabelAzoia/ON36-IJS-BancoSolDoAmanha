import { AccountEntity } from './entities/account.entity';
import { ClientEntity } from '../clients/entities/client.entity';
import { AccountType } from './account-type.enum';
import { AccountInterface } from './account.interface';

export class CheckingAccount extends AccountEntity implements AccountInterface {
    private transactionHistory: string[] = [];

    constructor(
        public id: string,
        public balance: number,
        public client: ClientEntity,
        public overdraftLimit: number,
        public accountType: AccountType,
        public createdDate: Date,
        public accountHolderName: string
    ) {
        super(id, client, balance, accountType);
    }

    deposit(amount: number): void {
        if (amount <= 0) {
            throw new Error('O valor do depósito deve ser positivo');
        }
        this.balance += amount;
        this.transactionHistory.push(`Depósito de R$${amount.toFixed(2)}`);
    }

    withdraw(amount: number): boolean {
        if (amount <= 0) {
            throw new Error('O valor do saque deve ser positivo');
        }
        if (amount > this.balance) {
            throw new Error('Fundos insuficientes');
        }
        this.balance -= amount;
        this.transactionHistory.push(`Saque de R$${amount.toFixed(2)}`);
        return true;
    }

    checkBalance(): number { 
        return this.balance;
    }

    transfer(destinationAccount: AccountInterface, amount: number): boolean {
        if (amount <= 0) {
            throw new Error("O valor da transferência deve ser positivo.");
        }
        if (amount > this.balance) {
            throw new Error("Saldo insuficiente para realizar a transferência.");
        }

        this.balance -= amount;
        destinationAccount.receiveTransfer(amount);
        this.transactionHistory.push(`Transferência de R$${amount.toFixed(2)} para a conta ${destinationAccount.getAccountId()}`);
        
        return true;
    }

    generateStatement(): string {
        return `
        Extrato da Conta Corrente (${this.id}):
        Cliente: ${this.client.name}
        Saldo Atual: R$${this.balance.toFixed(2)}
        Histórico de Transações:
        ${this.transactionHistory.join("\n")}
        `;
    }

    receiveTransfer(amount: number): void {
        this.balance += amount;
        this.transactionHistory.push(`Recebimento de R$${amount.toFixed(2)} de outra conta`);
    }

    getAccountId(): string {
        return this.id;
    }
}
