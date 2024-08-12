import { AccountInterface } from '../../accounts/interfaces/account.interface';
import { AccountType } from '../../accounts/enums/account-type.enum';
import { ClientData } from '../../clients/models/client-data.model';

export abstract class AccountBase {
    constructor(
        public id: string,
        public client: ClientData,
        public balance: number,
        public type: AccountType
    ) {}

    abstract deposit(amount: number): void;
    abstract withdraw(amount: number): boolean;
    abstract transfer(destinationAccount: AccountInterface, amount: number): boolean;
    abstract checkBalance(): number;
    abstract generateStatement(): string; // Alterado para string
}
