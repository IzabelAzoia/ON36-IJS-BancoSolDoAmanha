import { Account } from './account.interface';

export interface Transaction {
    id: string;
    sourceAccount: Account;
    destinationAccount: Account | null;
    amount: number;
    date: Date;

    record(): void;
    description(): string;
    getId(): string;
    getDate(): Date;
}