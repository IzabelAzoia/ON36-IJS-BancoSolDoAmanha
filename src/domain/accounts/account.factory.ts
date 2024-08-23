import { ClientEntity } from '../clients/entities/client.entity';
import { SavingsAccount } from './savings-account.model';
import { CheckingAccount } from './checking-account.model';
import { AccountType } from './account-type.enum';
import { ClientService } from '../clients/services/client.service';
import { ManagerAdminService } from '../managers/services/manager-admin.service';


export class AccountFactory {
    constructor(
        private clientService: ClientService,
        private managerAdminService: ManagerAdminService,
    ) {}

    async createAccount(
        managerId: string,
        type: AccountType,
        client: ClientEntity,
        balance: number,
        extraParam?: number
    ): Promise<CheckingAccount | SavingsAccount> {
        const manager = await this.managerAdminService.findManagerById(managerId);

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

        await this.managerAdminService.addAccountToManager(managerId, account);

        return account;
    }

    private generateId(): string {
        return Math.random().toString(36).substr(2, 9);
    }
}