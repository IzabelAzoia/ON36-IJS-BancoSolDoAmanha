import { AccountInterface } from '../../accounts/interfaces/account.interface';
import { ClientData } from '../../clients/models/client-data.model';
import { AccountType } from '../enums/account-type.enum';

export abstract class AccountModel implements AccountInterface {
    id: string;
    client: ClientData;
    balance: number;
    type: AccountType;
    public accountType: AccountType 

    constructor(id: string, client: ClientData, balance: number, type: AccountType) {
        this.id = id;
        this.client = client;
        this.balance = balance;
        this.type = type;
    }

    abstract deposit(amount: number): void;
    abstract withdraw(amount: number): boolean;
    abstract checkBalance(): number;
    abstract transfer(destinationAccount: AccountInterface, amount: number): boolean;
    abstract receiveTransfer(amount: number): void;
    abstract generateStatement(): string;
    abstract getAccountId(): string;
}
