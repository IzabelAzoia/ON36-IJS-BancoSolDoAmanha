import { OpenAccountDto } from '../dtos/open-account.dto';
import { AccountInterface } from "./account.interface";

export interface AccountServiceInterface {
  openAccountForClient(clientId: string, openAccountDto: OpenAccountDto): string;
  closeAccountForClient(accountId: string): string;
  modifyAccountTypeForClient(accountId: string, type: string, balance: number): string;
  getAllAccounts(): AccountInterface[];
  }