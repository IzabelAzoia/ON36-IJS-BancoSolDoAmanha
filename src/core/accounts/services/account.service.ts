import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { AccountInterface } from '../interfaces/account.interface';
import { AccountFactory } from '../factories/account.factory';
import { IdGeneratorService } from './id-generator.service';
import { Manager } from '../models/manager.model';
import { Client } from '../models/client.model';
import { AccountType } from '../enums/account-type.enum';
import { OpenAccountDto } from '../dtos/open-account.dto';

@Injectable()
export class AccountService {
    private readonly filePath = path.resolve(__dirname, '../../data/accounts.json');


    constructor(
        private readonly accountFactory: AccountFactory,
        private readonly idGenerator: IdGeneratorService,
        private readonly managers: Map<string, Manager> = new Map<string, Manager>()
    ) {}

    private readAccounts(): AccountInterface[] {
        if (!fs.existsSync(this.filePath)) {
            return [];
        }
        const data = fs.readFileSync(this.filePath, 'utf8');
        return JSON.parse(data) as AccountInterface[];
    }

    private writeAccounts(accounts: AccountInterface[]): void {
        fs.writeFileSync(this.filePath, JSON.stringify(accounts, null, 2), 'utf8');
    }

    addManager(manager: Manager): void {
        this.managers.set(manager.id, manager);
    }

    findById(id: string): AccountInterface {
        const accounts = this.readAccounts();
        const account = accounts.find(account => account.id === id);
        if (!account) {
            throw new NotFoundException(`Account with ID ${id} not found`);
        }
        return account;
    }

    getBalance(accountId: string): number {
        const account = this.findById(accountId);
        return account.checkBalance(); // Assuming the method exists in the interface
    }

    updateBalance(id: string, newBalance: number): AccountInterface {
        const accounts = this.readAccounts();
        const account = accounts.find(account => account.id === id);
        if (!account) {
            throw new NotFoundException('Account not found');
        }
        account.balance = newBalance;
        this.writeAccounts(accounts);
        return account;
    }

    openAccount(
        manager: Manager,
        type: AccountType,
        client: Client,
        balance: number,
        extraParam?: number
      ): AccountInterface {
        if (manager.role !== 'manager') {
          throw new ForbiddenException('Only managers can open accounts');
        }
      
        // Passando os parâmetros na ordem correta
        const newAccount = this.accountFactory.createAccount(
          manager.id, // ID do Manager
          type, // Tipo da Conta
          client, // ID do Cliente
          balance, // Saldo
          extraParam // Parâmetro Extra (opcional)
        );
      
        const accounts = this.readAccounts();
        accounts.push(newAccount);
        this.writeAccounts(accounts);
        return newAccount;
      }

    removeAccount(manager: Manager, id: string): void {
        if (manager.role !== 'manager') {
            throw new ForbiddenException('Only managers can remove accounts');
        }
        const accounts = this.readAccounts();
        const index = accounts.findIndex(account => account.id === id);
        if (index < 0) {
            throw new NotFoundException('Account not found');
        }
        accounts.splice(index, 1);
        this.writeAccounts(accounts);
    }

    findAll(): AccountInterface[] {
        return this.readAccounts();
    }

    openAccountForClient(clientId: string, openAccountDto: OpenAccountDto): string {
        const client = this.findClientById(clientId);
        if (!client) {
            throw new NotFoundException(`Client with ID ${clientId} not found`);
        }

        const manager = this.findManagerById(openAccountDto.managerId);
        if (!manager) {
            throw new NotFoundException(`Manager with ID ${openAccountDto.managerId} not found`);
        }

        const newAccount = this.openAccount(manager, openAccountDto.type, client, openAccountDto.balance, openAccountDto.extraParam);
        return newAccount.id;
    }

    closeAccount(accountId: string): string {
        const account = this.findById(accountId);
        if (!account) {
            throw new NotFoundException('Account not found');
        }
        const accounts = this.readAccounts();
        const index = accounts.findIndex(acc => acc.id === accountId);
        if (index < 0) {
            throw new NotFoundException('Account not found');
        }
        accounts.splice(index, 1);
        this.writeAccounts(accounts);
        return `Account with ID ${accountId} successfully closed`;
    }

    modifyAccountTypeForClient(accountId: string, type: AccountType, balance: number): string {
        const account = this.findById(accountId);
        if (!account) {
            throw new NotFoundException('Account not found');
        }
        account.type = type;
        account.balance = balance;
        this.updateBalance(accountId, balance);
        return `Account with ID ${accountId} successfully modified to type ${type}`;
    }

    getAllAccounts(): AccountInterface[] {
        return this.findAll();
    }

    private findClientById(clientId: string): Client | undefined {
        // Placeholder logic for finding a client by ID
        // Implement according to your data source
        return undefined;
    }

    private findManagerById(managerId: string): Manager | undefined {
        return this.managers.get(managerId);
    }
}
