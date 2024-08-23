
import { ClientEntity } from '../clients/entities/client.entity';
import { AccountType } from './account-type.enum';
import { AccountInterface } from './account.interface';

export interface AccountFactoryInterface {
    createAccount(
        managerId: string,
        type: AccountType,
        client: ClientEntity,
        balance: number,
        extraParam?: number
    ): Promise<AccountInterface>;
}