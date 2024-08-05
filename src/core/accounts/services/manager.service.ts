import { Injectable, NotFoundException } from '@nestjs/common';
import { ClientService } from './client.service';
import { AccountService } from './account.service';
import { CreateClientDto } from '../dtos/create-client.dto';
import { OpenAccountDto } from '../dtos/open-account.dto';
import { Client } from '../models/client.model';
import { AccountInterface } from '../interfaces/account.interface';
import { AccountType } from 'core/accounts/enums/account-type.enum'; 
import { AccountFactory } from '../factories/account.factory';
import { Manager } from '../models/manager.model';

@Injectable()
export class ManagerService {
  private clients: Map<string, Client> = new Map();
  private accounts: Map<string, AccountInterface> = new Map();
  private managers: Map<string, Manager> = new Map();
  
  constructor(
    private readonly clientService: ClientService,
    private readonly accountService: AccountService,
    private readonly accountFactory: AccountFactory
  ) {}

  async addManager(manager: Manager): Promise<void> {
    this.managers.set(manager.id, manager);
}

async findManagerById(managerId: string): Promise<Manager | undefined> {
    return this.managers.get(managerId);
}

  async openAccount(
    managerId: string,
    clientId: string,
    accountType: AccountType, // Espera AccountType
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

  createClient(createClientDto: CreateClientDto): Client {
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

  getClient(id: string): Client {
    const client = this.clients.get(id);
    if (!client) {
      throw new NotFoundException('Client not found!');
    }
    return client;
  }

  getAllClients(): Client[] {
    return Array.from(this.clients.values());
  }

  getManager(managerId: string): Manager {
    const manager = this.managers.get(managerId);
    if (!manager) {
      throw new NotFoundException('Manager not found!');
    }
    return manager;
  }
}
