import { TransactionInterface } from '../../transactions/interfaces/transaction.interface';
import { TransactionLoggerInterface } from '../interfaces/transaction-logger.interface';

export class TransactionLogger implements TransactionLoggerInterface {
    log(transaction: TransactionInterface): void {
        console.log(`Transaction logged: ${transaction.getDate().toLocaleString()} - ${transaction.description()}`);
    }
}