import { IClientRepositoryInterface } from '../interfaces/i-cliente-repositoy.interface';
import { Client } from '../models/client.model';

export class ClientRepository implements IClientRepositoryInterface {
    private readonly clients: Map<string, Client> = new Map();

    async findById(id: string): Promise<Client | undefined> {
        return this.clients.get(id);
    }

    async save(client: Client): Promise<void> {
        this.clients.set(client.id, client);
    }

    async delete(id: string): Promise<void> {
        this.clients.delete(id);
    }

    async findAll(): Promise<Client[]> {
        return Array.from(this.clients.values());
    }
}

