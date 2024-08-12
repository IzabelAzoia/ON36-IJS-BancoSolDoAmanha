import { ClientData } from '../../clients/models/client-data.model';
import { AccountType } from '../enums/account-type.enum';

export class CreateAccountDto {
    id: string;
    type: AccountType;
    client: ClientData;
    balance: number;
    extraParam?: number;
}

