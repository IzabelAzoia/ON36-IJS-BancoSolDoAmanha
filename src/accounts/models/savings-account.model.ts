import { AccountInterface } from 'accounts/interfaces/account.interface';
import { ClientModel } from 'clients/models/client.model';
import { AccountType } from 'accounts/enums/account-type.enum';
import { Statement } from 'shared/interfaces/statement.interface';

export class SavingsAccount implements AccountInterface, Statement {
    id: string;
    client: ClientModel;
    balance: number;
    type: AccountType = AccountType.Savings;
    interestRate: number;

    constructor(id: string, client: ClientModel, balance: number, interestRate: number) {
        this.id = id;
        this.client = client;
        this.balance = balance;
        this.interestRate = interestRate;
    }

    deposit(amount: number): void {
        this.balance += amount;
    }

    withdraw(amount: number): boolean {
        if (amount <= this.balance) {
            this.balance -= amount;
            return true;
        }
        return false;
    }

    transfer(destinationAccount: AccountInterface, amount: number): boolean {
        if (this.withdraw(amount)) {
            destinationAccount.deposit(amount);
            return true;
        }
        return false;
    }

    getBalance(): number {
        return this.balance;
    }

    getStatement(): string[] {
        // Implementar lógica para gerar extrato
        return ["Extrato de conta poupança"];
    }

    checkBalance(): number {
        return this.balance;
    }

    generateStatement(): string[] {
        return ["Extrato detalhado de conta poupança"];
    }
}
