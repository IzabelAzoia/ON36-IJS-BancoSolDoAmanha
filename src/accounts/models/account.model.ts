import { ClientModel } from 'clients/models/client.model';

export class AccountModel {
    id: string;
    type: string;
    client: ClientModel;
    balance: number;

    constructor(id: string, type: string, client: ClientModel, balance: number = 0) {
        this.id = id;
        this.type = type;
        this.client = client;
        this.balance = balance;
    }

    deposit(amount: number): void {
        if (amount <= 0) {
            throw new Error('Deposit amount must be positive');
        }
        this.balance += amount;
    }

    withdraw(amount: number): void {
        if (amount <= 0) {
            throw new Error('Withdrawal amount must be positive');
        }
        if (amount > this.balance) {
            throw new Error('Insufficient funds');
        }
        this.balance -= amount;
    }

    getBalance(): number {
        return this.balance;
    }
}
