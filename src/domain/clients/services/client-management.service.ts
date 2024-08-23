import { ClientEntity } from "../entities/client.entity";


export class ClientManagementService {
    getClientById(clientId: string): ClientEntity | undefined {
        return this.findClientById(clientId);
    }
    private clients: ClientEntity[] = [];

    addClient(client: ClientEntity): void {
        this.clients.push(client);
    }

    removeClient(clientId: string): void {
        this.clients = this.clients.filter(client => client.id !== clientId);
    }

    findClientById(clientId: string): ClientEntity | undefined {
        return this.clients.find(client => client.id === clientId);
    }
    updateClient(updatedClient: ClientEntity): ClientEntity | undefined {
        const index = this.clients.findIndex(client => client.id === updatedClient.id);
        if (index === -1) {
            return undefined; // Cliente não encontrado
        }
        this.clients[index] = updatedClient;
        return updatedClient;
    }
}
