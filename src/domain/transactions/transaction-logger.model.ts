import { TransactionLoggerInterface } from './services/transaction-logger.interface';
import { TransactionInterface } from './transaction.interface';

export class TransactionLogger implements TransactionLoggerInterface {
    log(transaction: TransactionInterface): void {
      console.log(`Transaction logged: ${transaction.getDate().toLocaleString()} - ${transaction.getDescription()}`);
    }
  }