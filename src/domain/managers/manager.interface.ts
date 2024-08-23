import { ClientInterface } from '../clients/client.interface';
import { AccountInterface } from '../accounts/account.interface';
import { UserInterface } from '../users/user.interface';

export interface ManagerInterface extends UserInterface {
    manageClients(): ClientInterface[];
    manageAccounts(): AccountInterface[];
    addClient(client: ClientInterface): void;
    removeClient(clientId: string): void;
    createAccount(accountType: string, clientId: string, initialBalance: number): AccountInterface;
}
