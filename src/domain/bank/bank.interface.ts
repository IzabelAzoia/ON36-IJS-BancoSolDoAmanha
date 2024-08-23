import { AccountInterface } from '../accounts/account.interface';
import { User } from '../users/entities/user.entity';

export interface BankInterface  {
    name: string;
    clients: User[];
    accounts: AccountInterface[];
    findClientById(id: string): User | undefined;

    addClient(client: User): void;
    createAccount(account: AccountInterface): void;
    findAccountById(id: string): AccountInterface | undefined;
    listClients(): void;
    listAccounts(): void;
}
