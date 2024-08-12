import { ClientData } from "src/clients/models/client-data.model";
import { AccountInterface } from "../interfaces/account.interface";
import { AccountBase } from "./account-base";
import { AccountType } from "../enums/account-type.enum";

export class ConcreteAccount extends AccountBase implements AccountInterface {
    constructor(
        id: string,
        client: ClientData,
        balance: number,
        type: AccountType
    ) {
        super(id, client, balance, type);
    }

    deposit(amount: number): void {
        if (amount <= 0) {
            throw new Error('Deposit amount must be positive');
        }
        this.balance += amount;
    }

    withdraw(amount: number): boolean {
        if (amount <= 0) {
            throw new Error('Withdrawal amount must be positive');
        }
        if (amount > this.balance) {
            throw new Error('Insufficient funds');
        }
        this.balance -= amount;
        return true;
    }

    transfer(destinationAccount: AccountInterface, amount: number): boolean {
        if (this.withdraw(amount)) {
            destinationAccount.deposit(amount);
            return true;
        }
        return false;
    }

    checkBalance(): number {
        return this.balance;
    }

    generateStatement(): string {
        return 'Statement line 1';
    }
}
