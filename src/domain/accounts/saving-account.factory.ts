import { AccountEntity } from './entities/account.entity';
import { AccountFactoryInterface } from './account-factory.interface';
import { ClientEntity } from '../clients/entities/client.entity';
import { Injectable } from '@nestjs/common';
import { AccountType } from './account-type.enum';
import { SavingsAccount } from './savings-account.model';
import { ManagerAdminService } from '../managers/services/manager-admin.service';

@Injectable()
export class SavingsAccountFactory implements AccountFactoryInterface {
    constructor(
        private managerAdminService: ManagerAdminService
    ) {}

    async createAccount(  // Marque a função como 'async'
        managerId: string,
        type: AccountType,
        client: ClientEntity,
        balance: number,
        extraParam?: number
    ): Promise<SavingsAccount> {  // Retorne uma Promise
        if (type !== AccountType.Savings) {
            throw new Error('Invalid account type');
        }

        const manager = await this.managerAdminService.getManager(managerId);  // Use await aqui
        if (!client) {
            throw new Error('Client not found');
        }

        if (!manager) {
            throw new Error('Manager not found');
        }

        if (extraParam === undefined) {
            throw new Error('Interest rate is required for savings account');
        }

        const account = new SavingsAccount(
            this.generateId(),     // id: string
            balance,               // balance: number
            client,                // client: ClientEntity
            extraParam!,           // interestRate: number
            type,                  // accountType: AccountType
            new Date()             // createdDate: Date
        );
        await this.managerAdminService.addAccount(client.id, account);  // Use await aqui
        return account;
    }

    private generateId(): string {
        return Math.random().toString(36).substr(2, 9);
    }
}