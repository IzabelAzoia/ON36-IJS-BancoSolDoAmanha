import { ManagerService } from 'managers/services/manager.service';
import { ClientModel } from 'clients/models/client.model';
import { Injectable } from '@nestjs/common';
import { SavingsAccount } from 'accounts/models/savings-account.model';
import { CheckingAccount } from 'accounts/models/checking-account.model';
import { AccountInterface } from 'accounts/interfaces/account.interface';
import { AccountType } from 'accounts/enums/account-type.enum';
import { ClientService } from 'clients/services/client.service';

@Injectable()
export class AccountFactory {
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
    ): AccountInterface | CheckingAccount | SavingsAccount {
        const manager = this.managerService.getManager(managerId);
        if (!client) {
            throw new Error('Client not found');
        }

        if (!manager) {
            throw new Error('Manager not found');
        }

        let account: AccountInterface;

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

        manager.addAccount(client.id, account);
        return account;
    }

    private generateId(): string {
        return Math.random().toString(36).substr(2, 9);
    }
}
