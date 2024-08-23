import { ClientEntity } from 'src/domain/clients/entities/client.entity';
import { ClientRepositoryInterface } from '../../outbound/clients/cliente-repositoy.interface';

export class ClientRepository implements ClientRepositoryInterface {
    private readonly clients: Map<string, ClientEntity> = new Map();

    async findById(id: string): Promise<ClientEntity | undefined> {
        return this.clients.get(id);
    }

    async save(client: ClientEntity): Promise<void> {
        this.clients.set(client.id, client);
    }

    async delete(id: string): Promise<void> {
        this.clients.delete(id);
    }

    async findAll(): Promise<ClientEntity[]> {
        return Array.from(this.clients.values());
    }
}

