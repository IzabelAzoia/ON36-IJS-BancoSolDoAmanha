import { ClientModel } from '../../clients/models/client.model';
import { AccountType } from '../enums/account-type.enum';

export class CreateAccountDto {
    id: string;
    type: AccountType;
    client: ClientModel;
    balance: number;
    extraParam?: number;
}
