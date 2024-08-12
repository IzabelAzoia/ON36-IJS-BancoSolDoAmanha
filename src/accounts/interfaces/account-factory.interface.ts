import { ClientData } from '../../clients/models/client-data.model';
import { AccountType } from '../../accounts/enums/account-type.enum';
import { AccountInterface } from '../../accounts/interfaces/account.interface';

export interface AccountFactoryInterface {
    createAccount(
        managerId: string,
        type: AccountType,
        client: ClientData,
        balance: number,
        extraParam?: number
    ): AccountInterface;
}