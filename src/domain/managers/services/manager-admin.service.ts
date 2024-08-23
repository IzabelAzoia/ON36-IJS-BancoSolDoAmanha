import { Injectable, NotFoundException } from '@nestjs/common';
import { ClientService } from '../../clients/services/client.service';
import { AccountService } from '../../accounts/services/account.service';
import { CreateClientDto } from '../../../inbound/dtos/create-client.dto';
import { OpenAccountDto } from '../../../inbound/dtos/open-account.dto';
import { ClientEntity } from '../../clients/entities/client.entity';
import { AccountInterface } from '../../accounts/account.interface';
import { AccountType } from '../../accounts/account-type.enum'; 
import { AccountFactory } from '../../accounts/account.factory';
import { ManagerEntity } from '../entities/manager.entity';

@Injectable()
export class ManagerAdminService {
  private clients: Map<string, ClientEntity> = new Map();
  private accounts: Map<string, AccountInterface> = new Map();
  private managers: Map<string, ManagerEntity> = new Map();
  
  constructor(
    private readonly clientService: ClientService,
    private readonly accountService: AccountService,
    private readonly accountFactory: AccountFactory
  ) {}

  async addManager(manager: ManagerEntity): Promise<void> {
    this.managers.set(manager.id, manager);
  }

  async findManagerById(managerId: string): Promise<ManagerEntity | undefined> {
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
  
    const newAccount = await this.accountFactory.createAccount(
      managerId,
      accountType,
      client,
      initialBalance,
      extraParam
    );

    this.accounts.set(newAccount.id, newAccount);
    return newAccount;
  }
  async addAccountToManager(managerId: string, account: AccountInterface): Promise<void> {
    const manager = await this.findManagerById(managerId);
    if (!manager) {
        throw new Error('Manager not found');
    }
    this.accounts.set(account.getAccountId(), account);
}
async addAccount(clientId: string, account: AccountInterface): Promise<void> {
  const client = this.clients.get(clientId);
  if (!client) {
      throw new Error(`Client with ID ${clientId} does not exist.`);
  }

  client.accounts.push(account);
  this.accounts.set(account.getAccountId(), account);
}

  async createClient(createClientDto: CreateClientDto): Promise<ClientEntity> {
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

  async getClient(id: string): Promise<ClientEntity> {
    const client = this.clients.get(id);
    if (!client) {
      throw new NotFoundException('Client not found!');
    }
    return client;
  }

  getAllClients(): ClientEntity[] {
    return Array.from(this.clients.values());
  }

  async getManager(managerId: string): Promise<ManagerEntity> {
    const manager = this.managers.get(managerId);
    if (!manager) {
      throw new NotFoundException('Manager not found!');
    }
    return manager;
  }
}
