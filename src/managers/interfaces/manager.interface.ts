import { ClientInterface } from '../../clients/interfaces/client.interface';
import { AccountInterface } from '../../accounts/interfaces/account.interface';
import { UserInterface } from '../../users/interfaces/user.interface';

export interface ManagerInterface extends UserInterface {
    manageClients(): ClientInterface[];
    manageAccounts(): AccountInterface[];
    addClient(client: ClientInterface): void;
    removeClient(clientId: string): void;
    createAccount(accountType: string, clientId: string, initialBalance: number): AccountInterface;
}
