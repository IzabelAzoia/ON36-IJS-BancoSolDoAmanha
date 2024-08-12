import { ManagerService } from '../../managers/services/manager.service';
import { ClientData } from '../../clients/models/client-data.model';
import { Injectable } from '@nestjs/common';
import { SavingsAccount } from '../../accounts/models/savings-account.model';
import { CheckingAccount } from '../../accounts/models/checking-account.model';
import { AccountInterface } from '../../accounts/interfaces/account.interface';
import { AccountType } from '../../accounts/enums/account-type.enum';
import { ClientService } from '../../clients/services/client.service';

export class AccountFactory {
    constructor(
        private clientService: ClientService,
        private managerService: ManagerService
    ) {}

    async createAccount(
        managerId: string,
        type: AccountType,
        client: ClientData,
        balance: number,
        extraParam?: number
    ): Promise<CheckingAccount | SavingsAccount> {
        const manager = await this.managerService.getManager(managerId);
        if (!manager) {
            throw new Error('Manager not found');
        }
    
        if (!client) {
            throw new Error('Client not found');
        }

        let account: CheckingAccount | SavingsAccount;

        switch (type) {
            case AccountType.Savings:
                if (extraParam === undefined) {
                    throw new Error('Interest rate is required for savings account');
                }
                account = new SavingsAccount(
                    this.generateId(),
                    balance,
                    client,
                    extraParam,
                    type,
                    new Date()
                );
                break;
            case AccountType.Checking:
                if (extraParam === undefined) {
                    throw new Error('Overdraft limit is required for checking account');
                }
                account = new CheckingAccount(
                    this.generateId(),
                    balance,
                    client,
                    extraParam,
                    type,
                    new Date(),
                    client.name
                );
                break;
            default:
                throw new Error('Invalid account type');
        }

        manager.addAccount(client.id, account);

        return account;
    }

    private generateId(): string {
        return Math.random().toString(36).substr(2, 9);
    }
}