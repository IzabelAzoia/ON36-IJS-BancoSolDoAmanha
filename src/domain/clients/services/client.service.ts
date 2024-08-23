import { Injectable, NotFoundException } from '@nestjs/common';
import { IdGeneratorService } from '../../../infrastructure/shared/utils/id-generator.service';
import { CreateClientDto } from '../../../inbound/dtos/create-client.dto';
import { ClientRepositoryInterface } from '../../../outbound/clients/cliente-repositoy.interface';
import { ClientManagementService } from './client-management.service';
import { ClientEntity } from '../entities/client.entity';
import { ClientFinancialService } from './client-financial.service';
import { UpdateClientDto } from 'src/inbound/dtos/update-client.dto';

@Injectable()
export class ClientService  {
    private readonly idGenerator = new IdGeneratorService();
    private readonly clientManagementService: ClientManagementService;
    private clientFinancialService: ClientFinancialService;

    constructor(
        private readonly clientRepository: ClientRepositoryInterface,
        clientManagementService: ClientManagementService,
        clientFinancialService: ClientFinancialService
    ) {
        this.clientManagementService = clientManagementService;
        this.clientFinancialService = clientFinancialService;
    }

    async createClient(createClientDto: CreateClientDto): Promise<ClientEntity> {
        const client = new ClientEntity(
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

    async findById(id: string): Promise<ClientEntity | undefined> {
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

    async getAllClients(): Promise<ClientEntity[]> {
        return this.clientRepository.findAll();
    }

    async getClient(clientId: string): Promise<ClientEntity | undefined> {
        return this.clientManagementService.findClientById(clientId);
    }

    async getBalance(id: string): Promise<number> {
        return this.clientFinancialService.getBalance(id);
    }
    async updateClient(id: string, updateClientDto: UpdateClientDto): Promise<ClientEntity | undefined> {
        // Encontra o cliente pelo ID
        const client = await this.clientRepository.findById(id);
        if (!client) {
            throw new NotFoundException(`Client with ID ${id} not found`);
        }

        // Atualiza os dados do cliente com base no DTO fornecido
        if (updateClientDto.name) client.name = updateClientDto.name;
        if (updateClientDto.email) client.email = updateClientDto.email;
        if (updateClientDto.password) client.password = updateClientDto.password;
        if (updateClientDto.birthDate) client.birthDate = updateClientDto.birthDate;
        if (updateClientDto.cpf) client.cpf = updateClientDto.cpf;
        if (updateClientDto.phone) client.phone = updateClientDto.phone;
        if (updateClientDto.address) client.address = updateClientDto.address;
        if (updateClientDto.managerId) client.managerId = updateClientDto.managerId;
        if (updateClientDto.userStatus) client.userStatus = updateClientDto.userStatus;

        // Salva as alterações no repositório
        await this.clientRepository.save(client);
        this.clientManagementService.updateClient(client); // Atualiza o cliente no gerenciamento, se necessário

        return client;
    }

}