import { AccountType } from '../../domain/accounts/account-type.enum';

export class OpenAccountDto {
  readonly type: AccountType;
  readonly balance: number;
  readonly extraParam?: number;
  readonly managerId: string;

}
