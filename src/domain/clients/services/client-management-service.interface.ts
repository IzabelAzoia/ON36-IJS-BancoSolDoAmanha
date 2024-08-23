import { CreateClientDto } from "../../../inbound/dtos/create-client.dto";
import { ClientInterface } from "../client.interface";
import { ClientEntity } from "../entities/client.entity";

export interface ClientServiceInterface {
  createClient(createClientDto: CreateClientDto): Promise<ClientEntity>;
  findById(id: string): Promise<ClientEntity | undefined>;
  removeClient(clientId: string): Promise<string>;
  getAllClients(): Promise<ClientEntity[]>;
  getClient(clientId: string): Promise<ClientEntity | undefined>;
  getBalance(id: string): Promise<number>;
  getStatement(id: string): Promise<string[]>;
  addClient(client: ClientInterface): void;
  removeClient(clientId: string): void;
  updateClient(clientId: string, clientData: Partial<ClientInterface>): void;
}