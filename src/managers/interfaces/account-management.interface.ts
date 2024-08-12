import { AccountInterface } from '../../accounts/interfaces/account.interface';

export interface AccountManagementInterface {
    createAccount(accountType: string, clientId: string, initialBalance: number): AccountInterface;
    closeAccount(accountId: string): void;
    transferFunds(sourceAccountId: string, destinationAccountId: string, amount: number): boolean;
}
