import { AccountInterface } from '../interfaces/account.interface';
import { AccountType } from '../enums/account-type.enum';
import { Client } from './client.model';

export abstract class AccountBase{
    constructor(
        public id: string,
        public client: Client,
        public balance: number,
        public type: AccountType
    ) {}

    abstract deposit(amount: number): void;
    abstract withdraw(amount: number): boolean;
    abstract transfer(destinationAccount: AccountInterface, amount: number): boolean;
    abstract checkBalance(): number;
    abstract generateStatement(): string;
}
