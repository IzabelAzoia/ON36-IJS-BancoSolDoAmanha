import { Statement } from '../interfaces/statement.interface';
import { AccountType } from '../enums/account-type.enum';
import { AccountInterface } from '../interfaces/account.interface';
import { Client } from './client.model'; // Assuming you have an enum for AccountType

export class CheckingAccount implements AccountInterface, Statement {
    id: string;
    client: Client;
    balance: number;
    type: AccountType = AccountType.Checking;
    overdraftLimit: number;
    private statement: string[] = [];

    constructor(
        public clientId: string,
        public dailyWithdrawalLimit: number,
        public monthlyServiceFee: number,
    ) {}

    deposit(amount: number): void {
        this.balance += amount;
        this.statement.push(`Deposited: ${amount}`);
    }

    withdraw(amount: number): boolean {
        if (amount <= this.balance + this.overdraftLimit) {
            this.balance -= amount;
            this.statement.push(`Withdrew: ${amount}`);
            return true;
        }
        return false;
    }

    transfer(destinationAccount: AccountInterface, amount: number): boolean {
        if (this.withdraw(amount)) {
            destinationAccount.deposit(amount);
            this.statement.push(`Transferred: ${amount} to ${destinationAccount.id}`);
            return true;
        }
        return false;
    }

    getBalance(): number {
        return this.balance;
    }

    getStatement(): string[] {
        // Implementar lógica para gerar extrato
        return ["Extrato de conta corrente"];
    }

    checkBalance(): number {
        return this.balance;
    }

    generateStatement(): string[] {
        return this.statement;
    }
}