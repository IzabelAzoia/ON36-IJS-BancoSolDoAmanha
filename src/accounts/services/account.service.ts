import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { AccountInterface } from 'accounts/interfaces/account.interface';
import { AccountFactory } from 'accounts/factories/account.factory';
import { IdGeneratorService } from '../../shared/utils/id-generator.service';
import { ManagerModel } from 'managers/models/manager.model';
import { ClientModel } from 'clients/models/client.model';
import { AccountType } from 'accounts/enums/account-type.enum';
import { OpenAccountDto } from 'accounts/dtos/open-account.dto';

@Injectable()
export class AccountService {
    private readonly filePath = path.resolve(__dirname, '../../data/accounts.json');


    constructor(
        private readonly accountFactory: AccountFactory,
        private readonly idGenerator: IdGeneratorService,
        private readonly managers: Map<string, ManagerModel> = new Map<string, ManagerModel>()
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

    addManager(manager: ManagerModel): void {
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
        manager: ManagerModel,
        type: AccountType,
        client: ClientModel,
        balance: number,
        extraParam?: number
      ): AccountInterface {
        if (manager.role !== 'manager') {
          throw new ForbiddenException('Only managers can open accounts');
        }
      
        const newAccount = this.accountFactory.createAccount(
          manager.id,
          type, 
          client,
          balance,
          extraParam
        );
      
        const accounts = this.readAccounts();
        accounts.push(newAccount);
        this.writeAccounts(accounts);
        return newAccount;
      }

    removeAccount(manager: ManagerModel, id: string): void {
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

    private findClientById(clientId: string): ClientModel | undefined {
        return undefined;
    }

    private findManagerById(managerId: string): ManagerModel | undefined {
        return this.managers.get(managerId);
    }
}
