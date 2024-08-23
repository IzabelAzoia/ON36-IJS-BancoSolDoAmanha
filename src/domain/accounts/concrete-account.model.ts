import { AccountEntity } from './entities/account.entity';
import { AccountInterface } from './account.interface';
import { ClientEntity } from '../clients/entities/client.entity';
import { AccountType } from './account-type.enum';

export class ConcreteAccount extends AccountEntity {
    constructor(id: string, client: ClientEntity, balance: number, type: AccountType) {
        super(id, client, balance, type);
    }

    deposit(amount: number): void {
        this.balance += amount;
    }

    withdraw(amount: number): boolean {
        if (this.balance >= amount) {
            this.balance -= amount;
            return true;
        }
        return false;
    }

    checkBalance(): number {
        return this.balance;
    }

    transfer(destinationAccount: AccountInterface, amount: number): boolean {
        if (this.withdraw(amount)) {
            destinationAccount.deposit(amount);
            return true;
        }
        return false;
    }

    receiveTransfer(amount: number): void {
        this.deposit(amount);
    }

    generateStatement(): string {
        // Gerar uma declaração simples para exemplo
        return `Account ID: ${this.id}\nBalance: ${this.balance}`;
    }

    getAccountId(): string {
        return this.id;
    }
}
