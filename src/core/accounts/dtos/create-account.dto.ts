import { Client } from '../models/client.model';
import { AccountType } from '../enums/account-type.enum';

export class CreateAccountDto {
    id: string;
    type: AccountType;  // Atualizado para usar o enum AccountType
    client: Client;
    balance: number;
    extraParam?: number;
}
