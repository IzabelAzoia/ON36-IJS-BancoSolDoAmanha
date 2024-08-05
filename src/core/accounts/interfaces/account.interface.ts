import { Deposit, Withdrawal, Transfer, BalanceInquiry } from './account-methods.interface';
import { Client } from '../models/client.model';
import { AccountType } from '../enums/account-type.enum';
import { Statement } from '../interfaces/statement.interface';

export interface AccountInterface extends Deposit, Withdrawal, Transfer, BalanceInquiry, Statement {
    id: string;
    client: Client;
    balance: number;
    type: AccountType;
    checkBalance(): number;
    generateStatement(): string[];
  
    deposit(amount: number): void;
    withdraw(amount: number): boolean;
    transfer(destinationAccount: AccountInterface, amount: number): boolean;
    getBalance(): number;
    getStatement(): string[];
}