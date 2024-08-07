import { ClientModel } from 'clients/models/client.model';
import { AccountType } from 'accounts/enums/account-type.enum';
import { AccountInterface } from 'accounts/interfaces/account.interface';

export interface AccountFactoryInterface {
    createAccount(
        managerId: string,
        type: AccountType,
        client: ClientModel,
        balance: number,
        extraParam?: number
    ): AccountInterface;
}