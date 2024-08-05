import { CreateClientDto } from "../dtos/create-client.dto";
import { Client } from "../models/client.model";

export interface ClientServiceInterface {
  createClient(createClientDto: CreateClientDto): Promise<Client>;
  removeClient(clientId: string): Promise<string>;
  getAllClients(): Promise<Client[]>;
  getClient(clientId: string): Promise<Client | undefined>;
  getBalance(id: string): Promise<number>;
  getStatement(id: string): Promise<string[]>;
  }