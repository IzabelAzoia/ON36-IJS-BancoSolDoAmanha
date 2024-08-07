import { ClientModel } from 'clients/models/client.model';
import { CheckingAccount } from 'accounts/models/checking-account.model';
import { SavingsAccount } from 'accounts/models/savings-account.model';
import { AccountInterface } from 'accounts/interfaces/account.interface';

export class AccountClient {
    id: string;
    name: string;
    cpf: string;
    phone: string;
    address: string;
    accounts: AccountInterface[] = [];

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

    addAccount(account: AccountInterface): void {
        this.accounts.push(account);
    }

    removeAccount(accountId: string): void {
        this.accounts = this.accounts.filter(acc => acc.id !== accountId);
    }

    findAccount(accountId: string): AccountInterface | undefined {
        return this.accounts.find(acc => acc.id === accountId);
    }

    getClientData(): string {
        return `Name: ${this.name}, Address: ${this.address}, Phone: ${this.phone}, CPF: ${this.cpf}`;
    }
}

