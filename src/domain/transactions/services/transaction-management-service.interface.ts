import { TransactionInterface } from "../transaction.interface";

export interface TransactionManagementServiceInterface {
    processTransaction(transaction: TransactionInterface): void;
    getTransactionHistory(clientId: string): TransactionInterface[];
  }