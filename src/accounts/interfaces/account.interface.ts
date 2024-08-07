import { Deposit, Withdrawal, Transfer, BalanceInquiry } from './account-methods.interface';
import { ClientModel } from 'clients/models/client.model';
import { AccountType } from 'accounts/enums/account-type.enum';
import { Statement } from 'shared/interfaces/statement.interface';

export interface AccountInterface extends Deposit, Withdrawal, Transfer, BalanceInquiry, Statement {
    id: string;
    client: ClientModel;
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