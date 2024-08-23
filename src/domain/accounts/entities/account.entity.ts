import { AccountInterface } from '../account.interface';
import { ClientEntity } from '../../clients/entities/client.entity';
import { AccountType } from '../account-type.enum';

export abstract class AccountEntity implements AccountInterface {
    id: string;
    client: ClientEntity;
    balance: number;
    type: AccountType;
    public accountType: AccountType 

    constructor(id: string, client: ClientEntity, balance: number, type: AccountType) {
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
