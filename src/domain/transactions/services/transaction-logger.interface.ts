import { TransactionInterface } from "../transaction.interface";


export interface TransactionLoggerInterface {
    log(transaction: TransactionInterface): void;
  }