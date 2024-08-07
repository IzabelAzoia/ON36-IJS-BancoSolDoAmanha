import { AccountInterface } from 'accounts/interfaces/account.interface';

export interface Transaction {
    id: string;
    sourceAccount: AccountInterface;
    destinationAccount: AccountInterface | null;
    amount: number;
    date: Date;

    record(): void;
    description(): string;
    getId(): string;
    getDate(): Date;
}