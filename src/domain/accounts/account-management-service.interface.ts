import { AccountInterface } from "./account.interface";

export interface AccountManagementServiceInterface {
  createAccount(accountType: string, clientId: string, initialBalance: number): AccountInterface;
  closeAccount(accountId: string): void;
  transferFunds(sourceAccountId: string, destinationAccountId: string, amount: number): boolean;
  modifyAccountTypeForClient(accountId: string, type: string, balance: number): string; // Adicionando métodos relevantes
  getAllAccounts(): AccountInterface[]; // Adicionando métodos relevantes
}