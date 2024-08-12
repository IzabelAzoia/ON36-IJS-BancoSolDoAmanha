import { IClientRepositoryInterface } from '../interfaces/i-cliente-repositoy.interface';
import { ClientData } from '../../clients/models/client-data.model'; 

export class ClientRepository implements IClientRepositoryInterface {
    private readonly clients: Map<string, ClientData> = new Map();

    async findById(id: string): Promise<ClientData | undefined> {
        return this.clients.get(id);
    }

    async save(client: ClientData): Promise<void> {
        this.clients.set(client.id, client);
    }

    async delete(id: string): Promise<void> {
        this.clients.delete(id);
    }

    async findAll(): Promise<ClientData[]> {
        return Array.from(this.clients.values());
    }
}

