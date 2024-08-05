import { OpenAccountDto } from '../dtos/open-account.dto';
import { AccountInterface } from "./account.interface";
import { AccountType } from 'core/accounts/enums/account-type.enum';

export interface AccountServiceInterface {
  openAccountForClient(clientId: string, openAccountDto: OpenAccountDto): string;
  closeAccountForClient(accountId: string): string;
  modifyAccountTypeForClient(accountId: string, type: string, balance: number): string;
  getAllAccounts(): AccountInterface[];
  }