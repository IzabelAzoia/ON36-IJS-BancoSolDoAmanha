import { Injectable, NotFoundException } from '@nestjs/common';
import { ClientData } from '../../clients/models/client-data.model';
import { IdGeneratorService } from '../../shared/utils/id-generator.service';
import { CreateClientDto } from '../../clients/dtos/create-client.dto';
import { ClientServiceInterface } from '../../clients/interfaces/client-service.interface';
import { IClientRepositoryInterface } from '../../clients/interfaces/i-cliente-repositoy.interface';
import { ClientManagementService } from './client-management.service';
import { ClientFinancialService } from './client-financial.service';

@Injectable()
export class ClientService  {
    private readonly idGenerator = new IdGeneratorService();
    private clientManagementService: ClientManagementService;
    private clientFinancialService: ClientFinancialService;

    constructor(
        private readonly clientRepository: IClientRepositoryInterface,
        clientManagementService: ClientManagementService,
        clientFinancialService: ClientFinancialService
    ) {
        this.clientManagementService = clientManagementService;
        this.clientFinancialService = clientFinancialService;
    }

    async createClient(createClientDto: CreateClientDto): Promise<ClientData> {
        const client = new ClientData(
            createClientDto.id || this.idGenerator.generateId(),
            createClientDto.name,
            createClientDto.email, // Adicione o email se necessário
            createClientDto.password,
            createClientDto.birthDate,
            createClientDto.cpf,
            createClientDto.phone,
            createClientDto.address,
            createClientDto.managerId,
            createClientDto.userStatus
        );
        await this.clientRepository.save(client);
        this.clientManagementService.addClient(client); // Adiciona o cliente ao gerenciamento
        return client;
    }

    async findById(id: string): Promise<ClientData | undefined> {
        return this.clientManagementService.findClientById(id);
    }

    async removeClient(clientId: string): Promise<string> {
        const client = await this.clientRepository.findById(clientId);
        if (!client) {
            throw new NotFoundException(`Client with ID ${clientId} not found`);
        }
        await this.clientRepository.delete(clientId);
        this.clientManagementService.removeClient(clientId);
        return `Client with ID ${clientId} removed`;
    }

    async getAllClients(): Promise<ClientData[]> {
        return this.clientRepository.findAll();
    }

    async getClient(clientId: string): Promise<ClientData | undefined> {
        return this.clientManagementService.findClientById(clientId);
    }

    async getBalance(id: string): Promise<number> {
        return this.clientFinancialService.getBalance(id);
    }

}