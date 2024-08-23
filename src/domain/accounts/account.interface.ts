
import { ClientEntity } from '../clients/entities/client.entity';
import { AccountType } from './account-type.enum';

export interface AccountInterface {
    id: string;
    deposit(amount: number): void;
    withdraw(amount: number): boolean;
    checkBalance(): number;
    transfer(destinationAccount: AccountInterface, amount: number): boolean;
    receiveTransfer(amount: number): void;
    generateStatement(): string;
    getAccountId(): string;
    client: ClientEntity;
    balance: number;
    type: AccountType;
}
