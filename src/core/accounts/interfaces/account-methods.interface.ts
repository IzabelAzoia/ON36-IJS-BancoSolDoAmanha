import { AccountInterface } from "./account.interface";

export interface Deposit {
    deposit(amount: number): void;
}

export interface Withdrawal {
    withdraw(amount: number): boolean;
}

export interface Transfer {
    transfer(destinationAccount: AccountInterface, amount: number): boolean;
}

export interface BalanceInquiry {
    checkBalance(): number;
}

export interface Statement {
    generateStatement(): string;
}
