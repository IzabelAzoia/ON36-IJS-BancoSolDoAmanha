import { IClientRepositoryInterface } from '../interfaces/i-cliente-repositoy.interface';
import { ClientModel } from 'clients/models/client.model';

export class ClientRepository implements IClientRepositoryInterface {
    private readonly clients: Map<string, ClientModel> = new Map();

    async findById(id: string): Promise<ClientModel | undefined> {
        return this.clients.get(id);
    }

    async save(client: ClientModel): Promise<void> {
        this.clients.set(client.id, client);
    }

    async delete(id: string): Promise<void> {
        this.clients.delete(id);
    }

    async findAll(): Promise<ClientModel[]> {
        return Array.from(this.clients.values());
    }
}

