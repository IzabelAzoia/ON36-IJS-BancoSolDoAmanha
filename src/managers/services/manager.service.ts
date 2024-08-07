import { Injectable, NotFoundException } from '@nestjs/common';
import { ClientService } from '../../clients/services/client.service';
import { AccountService } from '../../accounts/services/account.service';
import { CreateClientDto } from '../../clients/dtos/create-client.dto';
import { OpenAccountDto } from '../../accounts/dtos/open-account.dto';
import { ClientModel } from '../../clients/models/client.model';
import { AccountInterface } from 'accounts/interfaces/account.interface';
import { AccountType } from 'accounts/enums/account-type.enum'; 
import { AccountFactory } from 'accounts/factories/account.factory';
import { ManagerModel } from 'managers/models/manager.model';

@Injectable()
export class ManagerService {
  private clients: Map<string, ClientModel> = new Map();
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
  ):  Promise<AccountInterface> {
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

  createClient(createClientDto: CreateClientDto): ClientModel {
    return this.clientService.createClient(createClientDto);
  }

  removeClient(clientId: string): string {
    return this.clientService.removeClient(clientId);
  }

  openAccountForClient(clientId: string, openAccountDto: OpenAccountDto): string {
    return this.accountService.openAccountForClient(clientId, openAccountDto);
  }

  closeAccountForClient(accountId: string): string {
    return this.accountService.closeAccount(accountId);
  }

  modifyAccountTypeForClient(accountId: string, type: AccountType, balance: number): string {
    return this.accountService.modifyAccountTypeForClient(accountId, type, balance);
  }

  getAllClientsAndAccounts(): any[] {
    return Array.from(this.clients.values()).map(client => ({
      client,
      accounts: client.accounts
    }));
  }

  getAllAccounts(): AccountInterface[] {
    return this.accountService.getAllAccounts();
  }

  getClient(id: string): ClientModel {
    const client = this.clients.get(id);
    if (!client) {
      throw new NotFoundException('Client not found!');
    }
    return client;
  }

  getAllClients(): ClientModel[] {
    return Array.from(this.clients.values());
  }

  getManager(managerId: string): ManagerModel {
    const manager = this.managers.get(managerId);
    if (!manager) {
      throw new NotFoundException('Manager not found!');
    }
    return manager;
  }
}
