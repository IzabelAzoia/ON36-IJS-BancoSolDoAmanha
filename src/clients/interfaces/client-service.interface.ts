import { UserInterface } from "src/users/interfaces/user.interface";
import { CreateClientDto } from "../dtos/create-client.dto";
import { ClientData } from "../models/client-data.model";


export interface ClientServiceInterface {
  createClient(createClientDto: CreateClientDto): Promise<ClientData>;
  findById(id: string): Promise<ClientData | undefined>;
  removeClient(clientId: string): Promise<string>;
  getAllClients(): Promise<ClientData[]>;
  getClient(clientId: string): Promise<ClientData | undefined>;
  getBalance(id: string): Promise<number>;
  getStatement(id: string): Promise<string[]>;
}