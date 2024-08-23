import { ClientEntity } from '../../domain/clients/client.entity';
import { AccountType } from '../../domain/accounts/account-type.enum';

export class CreateAccountDto {
    id: string;
    type: AccountType;
    client: ClientEntity;
    balance: number;
    extraParam?: number;
}

