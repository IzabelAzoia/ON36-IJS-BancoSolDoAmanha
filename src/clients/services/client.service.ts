import { Injectable, NotFoundException } from '@nestjs/common';
import { ClientModel } from 'clients/models/client.model';
import { IdGeneratorService } from 'shared/utils/id-generator.service';
import { CreateClientDto } from 'clients/dtos/create-client.dto';
import { ClientServiceInterface } from 'clients/interfaces/client-service.interface';
import { IClientRepositoryInterface } from 'clients/interfaces/i-cliente-repositoy.interface';

@Injectable()
export class ClientService implements ClientServiceInterface {
  private readonly idGenerator = new IdGeneratorService();

  constructor(private readonly clientRepository: IClientRepositoryInterface) {}

  async createClient(createClientDto: CreateClientDto): Promise<ClientModel> {
    const client = new ClientModel(
      createClientDto.id || this.idGenerator.generateId(),
      createClientDto.name,
      createClientDto.password,
      createClientDto.birthDate,
      createClientDto.cpf,
      createClientDto.phone,
      createClientDto.address,
      createClientDto.userStatus,
    );
    await this.clientRepository.save(client);
    return client;
  }
  async findById(id: string): Promise<ClientModel | undefined> {
    return this.clientRepository.findById(id);
  }

  async removeClient(clientId: string): Promise<string> {
    const client = await this.clientRepository.findById(clientId);
    if (!client) {
      throw new NotFoundException(`Client with ID ${clientId} not found`);
    }
    await this.clientRepository.delete(clientId);
    return `Client with ID ${clientId} removed`;
  }

  async getAllClients(): Promise<ClientModel[]> {
    return this.clientRepository.findAll();
  }

  async getClient(clientId: string): Promise<ClientModel | undefined> {
    return this.clientRepository.findById(clientId);
  }

  async getBalance(id: string): Promise<number> {
    const client = await this.getClient(id);
    if (!client) {
      throw new NotFoundException(`Client with ID ${id} not found`);
    }
    return client.checkBalance();
  }

  async getStatement(id: string): Promise<string[]> {
    const client = await this.getClient(id);
    if (!client) {
      throw new NotFoundException(`Client with ID ${id} not found`);
    }
    return client.getStatement();
  }
}
