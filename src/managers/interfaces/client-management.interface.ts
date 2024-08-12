import { ClientInterface } from '../../clients/interfaces/client.interface';

export interface ClientManagementInterface {
    addClient(client: ClientInterface): void;
    removeClient(clientId: string): void;
    updateClient(clientId: string, clientData: Partial<ClientInterface>): void;
}
