import { TransactionInterface } from '../../transactions/interfaces/transaction.interface';

export interface TransactionManagementInterface {
    processTransaction(transaction: TransactionInterface): void;
    getTransactionHistory(clientId: string): TransactionInterface[];
}
