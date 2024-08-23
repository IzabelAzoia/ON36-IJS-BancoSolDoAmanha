import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { AccountInterface } from '../account.interface';
import { AccountFactory } from '../account.factory';
import { IdGeneratorService } from '../../../infrastructure/shared/utils/id-generator.service';
import { ManagerEntity } from '../../managers/entities/manager.entity';
import { ClientEntity } from '../../clients/entities/client.entity';
import { AccountType } from '../account-type.enum';
import { OpenAccountDto } from '../../../inbound/dtos/open-account.dto';
import { ClientService } from '../../clients/services/client.service';

@Injectable()
export class AccountService {
    private readonly filePath = path.resolve(__dirname, '../../data/accounts.json');

    constructor(
        private readonly accountFactory: AccountFactory,
        private readonly idGenerator: IdGeneratorService,
        private readonly clientService: ClientService, // Adicione essa linha
        private readonly managers: Map<string, ManagerEntity> = new Map<string, ManagerEntity>()
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

    addManager(manager: ManagerEntity): void {
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

    async openAccount(
        manager: ManagerEntity,
        type: AccountType,
        client: ClientEntity,
        balance: number,
        extraParam?: number
    ): Promise<AccountInterface> {
        if (manager.role !== 'manager') {
            throw new ForbiddenException('Only managers can open accounts');
        }
    
        const newAccount = await this.accountFactory.createAccount(
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

    removeAccount(manager: ManagerEntity, id: string): void {
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

    async openAccountForClient(clientId: string, openAccountDto: OpenAccountDto): Promise<string> {
        const client = await this.findClientById(clientId);
        if (!client) {
            throw new NotFoundException(`Client with ID ${clientId} not found`);
        }
    
        const manager = await this.findManagerById(openAccountDto.managerId);
        if (!manager) {
            throw new NotFoundException(`Manager with ID ${openAccountDto.managerId} not found`);
        }
    
        const newAccount = await this.openAccount(manager, openAccountDto.type, client, openAccountDto.balance, openAccountDto.extraParam);
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

    private async findClientById(clientId: string): Promise<ClientEntity | undefined> {
        return await this.clientService.findById(clientId);
    }

    private findManagerById(managerId: string): ManagerEntity | undefined {
        return this.managers.get(managerId);
    }
}
