import { User } from '../../users/models/user.model';
import { AccountInterface } from '../../accounts/interfaces/account.interface';

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
