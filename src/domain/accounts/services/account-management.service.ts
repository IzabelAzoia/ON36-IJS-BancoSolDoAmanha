import { AccountFactory } from '../account.factory';
import { AccountInterface } from '../account.interface';
import { ClientEntity } from '../../clients/entities/client.entity';
import { AccountType } from '../account-type.enum';

export class AccountManagementService {
    constructor(private accountFactory: AccountFactory) {}

    async createAccount(
        managerId: string,
        type: AccountType,
        client: ClientEntity,
        balance: number,
        extraParam?: number
    ): Promise<AccountInterface> {  // Adicione 'async' e 'Promise' para refletir o retorno assíncrono
        return await this.accountFactory.createAccount(managerId, type, client, balance, extraParam);
    }

    addAccount(client: ClientEntity, account: AccountInterface): void {
        client.accounts.push(account);
    }
}