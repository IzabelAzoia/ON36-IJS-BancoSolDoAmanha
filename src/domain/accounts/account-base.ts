import { AccountInterface } from './account.interface';
import { AccountType } from './account-type.enum';
import { ClientEntity } from '../clients/entities/client.entity';

export abstract class AccountBase {
    constructor(
        public id: string,
        public client: ClientEntity,
        public balance: number,
        public type: AccountType
    ) {}

    abstract deposit(amount: number): void;
    abstract withdraw(amount: number): boolean;
    abstract transfer(destinationAccount: AccountInterface, amount: number): boolean;
    abstract checkBalance(): number;
    abstract generateStatement(): string; // Alterado para string
}
