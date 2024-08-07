import { Client } from '../../accounts/models/client.model';

export interface IClientRepositoryInterface {
  findById(id: string): Promise<Client | undefined>;
  save(client: Client): Promise<void>;
  delete(id: string): Promise<void>;
  findAll(): Promise<Client[]>;
}