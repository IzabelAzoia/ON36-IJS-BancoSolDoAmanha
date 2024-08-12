import { AccountFactory } from '../../accounts/factories/account.factory';
import { AccountInterface } from '../../accounts/interfaces/account.interface';
import { ClientData } from '../../clients/models/client-data.model'; // Atualize para ClientData
import { AccountType } from '../../accounts/enums/account-type.enum';

export class AccountManagementService {
    constructor(private accountFactory: AccountFactory) {}

    createAccount(
        managerId: string,
        type: AccountType,
        client: ClientData,
        balance: number,
        extraParam?: number
    ): AccountInterface {
        return this.accountFactory.createAccount(managerId, type, client, balance, extraParam);
    }

    addAccount(client: ClientData, account: AccountInterface): void {
        client.accounts.push(account);
    }
}
