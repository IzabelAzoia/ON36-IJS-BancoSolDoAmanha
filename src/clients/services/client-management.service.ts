import { ClientData } from '../../clients/models/client-data.model';

export class ClientManagementService {
    private clients: ClientData[] = [];

    addClient(client: ClientData): void {
        this.clients.push(client);
    }

    removeClient(clientId: string): void {
        this.clients = this.clients.filter(client => client.id !== clientId);
    }

    findClientById(clientId: string): ClientData | undefined {
        return this.clients.find(client => client.id === clientId);
    }
}
