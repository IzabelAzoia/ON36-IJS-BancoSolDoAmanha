import { ClientEntity } from "src/domain/clients/entities/client.entity";


export interface ClientRepositoryInterface {
  findById(id: string): Promise<ClientEntity | undefined>;
  save(client: ClientEntity): Promise<void>;
  delete(id: string): Promise<void>;
  findAll(): Promise<ClientEntity[]>;
}