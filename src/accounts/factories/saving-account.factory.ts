import { AccountModel } from 'accounts/models/account.model';
import { AccountFactoryInterface } from 'accounts/interfaces/account-factory.interface';
import { ClientModel } from 'clients/models/client.model';
import { Injectable } from '@nestjs/common';
import { AccountType } from 'accounts/enums/account-type.enum';
import { CheckingAccount } from 'accounts/models/checking-account.model';
import { ClientService } from 'clients/services/client.service';
import { ManagerService } from 'managers/services/manager.service';
import { SavingsAccount } from 'accounts/models/savings-account.model';

@Injectable()
export class SavingsAccountFactory implements AccountFactoryInterface {
    constructor(
        private managerService: ManagerService
    ) {}

    createAccount(
        managerId: string,
        type: AccountType,
        client: ClientModel,
        balance: number,
        extraParam?: number
    ): SavingsAccount {
        if (type !== AccountType.Savings) {
            throw new Error('Invalid account type');
        }

        const manager = this.managerService.getManager(managerId);
        if (!client) {
            throw new Error('Client not found');
        }

        if (!manager) {
            throw new Error('Manager not found');
        }

        if (extraParam === undefined) {
            throw new Error('Interest rate is required for savings account');
        }

        const account = new SavingsAccount(this.generateId(), client, balance, extraParam);
        manager.addAccount(client.id, account);
        return account;
    }

    private generateId(): string {
        return Math.random().toString(36).substr(2, 9);
    }
}