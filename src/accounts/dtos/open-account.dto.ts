import { AccountType } from '../enums/account-type.enum';

export class OpenAccountDto {
  readonly type: AccountType;
  readonly balance: number;
  readonly extraParam?: number;
  readonly managerId: string;

}
