// models/account-client.model.ts

import { Client } from './client.model';
import { CheckingAccount } from './checking-account.model';
import { SavingsAccount } from './savings-account.model';
import { Account } from '../interfaces/account.interface';

export class AccountClient {
    id: string;
    name: string;
    cpf: string;
    phone: string;
    address: string;
    accounts: Account[] = [];

    constructor(
        id: string,
        name: string,
        cpf: string,
        phone: string,
        address: string
    ) {
        this.id = id;
        this.name = name;
        this.cpf = cpf;
        this.phone = phone;
        this.address = address;
    }

    // Add an account to the client
    addAccount(account: Account): void {
        this.accounts.push(account);
    }

    // Remove an account from the client
    removeAccount(accountId: string): void {
        this.accounts = this.accounts.filter(acc => acc.id !== accountId);
    }

    // Find an account by ID
    findAccount(accountId: string): Account | undefined {
        return this.accounts.find(acc => acc.id === accountId);
    }

    // Retrieve client data
    getClientData(): string {
        return `Name: ${this.name}, Address: ${this.address}, Phone: ${this.phone}, CPF: ${this.cpf}`;
    }
}

