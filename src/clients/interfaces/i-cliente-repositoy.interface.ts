
import { ClientData } from "../../clients/models/client-data.model";

export interface IClientRepositoryInterface {
  findById(id: string): Promise<ClientData | undefined>;
  save(client: ClientData): Promise<void>;
  delete(id: string): Promise<void>;
  findAll(): Promise<ClientData[]>;
}