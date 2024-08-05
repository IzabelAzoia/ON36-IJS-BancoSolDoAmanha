import { Injectable } from '@nestjs/common';
import { SavingsAccount } from '../models/savings-account.model';
import { CheckingAccount } from '../models/checking-account.model';
import { AccountInterface } from '../interfaces/account.interface';
import { AccountType } from '../enums/account-type.enum';
import { ClientService } from 'core/accounts/services/client.service';
import { ManagerService } from 'core/accounts/services/manager.service';
import { Client } from '../models/client.model';

@Injectable()
export class AccountFactory {
    constructor(
        private clientService: ClientService,
        private managerService: ManagerService
    ) {}

    createAccount(
        managerId: string, // ID do Manager
        type: AccountType,
        client: Client, // Objeto Client
        balance: number,
        extraParam?: number
    ): AccountInterface | CheckingAccount | SavingsAccount {
        // Obtém o gerente com base no ID
        const manager = this.managerService.getManager(managerId);
        if (!client) {
            throw new Error('Client not found');
        }

        if (!manager) {
            throw new Error('Manager not found');
        }

        let account: AccountInterface;

        // Cria a conta de acordo com o tipo especificado
        switch (type) {
            case AccountType.Savings:
                if (extraParam === undefined) {
                    throw new Error('Interest rate is required for savings account');
                }
                account = new SavingsAccount(this.generateId(), client, balance, extraParam);
                break;
            case AccountType.Checking:
                if (extraParam === undefined) {
                    throw new Error('Overdraft limit is required for checking account');
                }
                account = new CheckingAccount(this.generateId(), balance, extraParam);
                break;
            default:
                throw new Error('Invalid account type');
        }

        // Adiciona a conta ao gerente e retorna
        manager.addAccount(client.id, account);
        return account;
    }

    private generateId(): string {
        // Implementa a lógica para gerar um ID único
        return Math.random().toString(36).substr(2, 9);
    }
}
