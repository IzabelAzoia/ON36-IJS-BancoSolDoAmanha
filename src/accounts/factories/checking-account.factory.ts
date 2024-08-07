import { Injectable } from '@nestjs/common';
import { ClientModel } from 'clients/models/client.model';
import { AccountType } from 'accounts/enums/account-type.enum';
import { CheckingAccount } from 'accounts/models/checking-account.model';
import { ClientService } from 'clients/services/client.service';
import { ManagerService } from 'managers/services/manager.service';
import { AccountFactoryInterface } from 'accounts/interfaces/account-factory.interface';

@Injectable()
export class CheckingAccountFactory implements AccountFactoryInterface {
    constructor(
        private clientService: ClientService,
        private managerService: ManagerService
    ) {}

    createAccount(
        managerId: string,
        type: AccountType,
        client: ClientModel,
        balance: number,
        extraParam?: number
    ): CheckingAccount {
        if (type !== AccountType.Checking) {
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
            throw new Error('Overdraft limit is required for checking account');
        }

        const account = new CheckingAccount(this.generateId(), balance, extraParam);
        manager.addAccount(client.id, account);
        return account;
    }

    private generateId(): string {
        return Math.random().toString(36).substr(2, 9);
    }
}
