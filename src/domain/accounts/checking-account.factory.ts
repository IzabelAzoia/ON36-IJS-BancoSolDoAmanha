import { Injectable } from '@nestjs/common';
import { ClientEntity } from '../clients/entities/client.entity';
import { AccountType } from './account-type.enum';
import { CheckingAccount } from './checking-account.model';
import { ClientService } from '../clients/services/client.service';
import { ManagerAdminService } from '../managers/services/manager-admin.service';

@Injectable()
export class CheckingAccountFactory {
    constructor(
        private clientService: ClientService,
        private managerAdminService: ManagerAdminService
    ) {}

    async createAccount(
        managerId: string,
        type: AccountType,
        client: ClientEntity,
        balance: number,
        extraParam?: number
    ): Promise<CheckingAccount> {
        if (type !== AccountType.Checking) {
            throw new Error('Invalid account type');
        }

        const manager = await this.managerAdminService.getManager(managerId);
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

        await this.managerAdminService.addAccountToManager(client.id, account);

        return account;
    }

    private generateId(): string {
        return Math.random().toString(36).substr(2, 9);
    }
}
