import { Injectable, NotFoundException } from '@nestjs/common';
import { ClientService } from '../../clients/services/client.service';
import { AccountService } from '../../accounts/services/account.service';
import { CreateClientDto } from '../../clients/dtos/create-client.dto';
import { OpenAccountDto } from '../../accounts/dtos/open-account.dto';
import { ClientData } from '../../clients/models/client-data.model';
import { AccountInterface } from '../../accounts/interfaces/account.interface';
import { AccountType } from '../../accounts/enums/account-type.enum'; 
import { AccountFactory } from '../../accounts/factories/account.factory';
import { ManagerModel } from '../../managers/models/manager.model';

@Injectable()
export class ManagerService {
  private clients: Map<string, ClientData> = new Map();
  private accounts: Map<string, AccountInterface> = new Map();
  private managers: Map<string, ManagerModel> = new Map();
  
  constructor(
    private readonly clientService: ClientService,
    private readonly accountService: AccountService,
    private readonly accountFactory: AccountFactory
  ) {}

  async addManager(manager: ManagerModel): Promise<void> {
    this.managers.set(manager.id, manager);
  }

  async findManagerById(managerId: string): Promise<ManagerModel | undefined> {
    return this.managers.get(managerId);
  }

  async openAccount(
    managerId: string,
    clientId: string,
    accountType: AccountType,
    initialBalance: number,
    extraParam?: number
  ): Promise<AccountInterface> {
    const client = this.clients.get(clientId);
    if (!client) {
      throw new Error(`Client with ID ${clientId} does not exist.`);
    }
  
    const newAccount = this.accountFactory.createAccount(
      managerId,
      accountType,
      client,
      initialBalance,
      extraParam
    );

    this.accounts.set(newAccount.id, newAccount);
    return newAccount;
  }

  async createClient(createClientDto: CreateClientDto): Promise<ClientData> {
    return await this.clientService.createClient(createClientDto);
  }

  async removeClient(clientId: string): Promise<string> {
    return await this.clientService.removeClient(clientId);
  }

  async openAccountForClient(clientId: string, openAccountDto: OpenAccountDto): Promise<string> {
    return await this.accountService.openAccountForClient(clientId, openAccountDto);
  }

  async closeAccountForClient(accountId: string): Promise<string> {
    return await this.accountService.closeAccount(accountId);
  }

  async modifyAccountTypeForClient(accountId: string, type: AccountType, balance: number): Promise<string> {
    return await this.accountService.modifyAccountTypeForClient(accountId, type, balance);
  }

  getAllClientsAndAccounts(): any[] {
    return Array.from(this.clients.values()).map(client => ({
      client,
      accounts: client.accounts
    }));
  }

  async getAllAccounts(): Promise<AccountInterface[]> {
    return await this.accountService.getAllAccounts();
  }

  async getClient(id: string): Promise<ClientData> {
    const client = this.clients.get(id);
    if (!client) {
      throw new NotFoundException('Client not found!');
    }
    return client;
  }

  getAllClients(): ClientData[] {
    return Array.from(this.clients.values());
  }

  async getManager(managerId: string): Promise<ManagerModel> {
    const manager = this.managers.get(managerId);
    if (!manager) {
      throw new NotFoundException('Manager not found!');
    }
    return manager;
  }
}
