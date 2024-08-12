import { Injectable } from '@nestjs/common';
import { ClientData } from '../../clients/models/client-data.model';
import { AccountType } from '../../accounts/enums/account-type.enum';
import { CheckingAccount } from '../../accounts/models/checking-account.model';
import { ClientService } from '../../clients/services/client.service';
import { ManagerService } from '../../managers/services/manager.service';
import { AccountFactoryInterface } from '../../accounts/interfaces/account-factory.interface';

@Injectable()
export class CheckingAccountFactory {
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
    ): Promise<CheckingAccount> {
        if (type !== AccountType.Checking) {
            throw new Error('Invalid account type');
        }

        const manager = await this.managerService.getManager(managerId);
        if (!client) {
            throw new Error('Client not found');
        }

        if (!manager) {
            throw new Error('Manager not found');
        }

        if (extraParam === undefined) {
            throw new Error('Overdraft limit is required for checking account');
        }

        const account = new CheckingAccount(
            this.generateId(),
            balance,
            client,
            extraParam,
            type,
            new Date(),
            client.name  
        );

        manager.addAccount(client.id, account);
        return account;
    }

    private generateId(): string {
        return Math.random().toString(36).substr(2, 9);
    }
}
