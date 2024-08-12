import { v4 as uuidv4 } from 'uuid';
import { TransactionInterface } from '../../transactions/interfaces/transaction.interface';

export class TransactionModel implements TransactionInterface {
  private id: string;
  private date: Date;
  private desc: string;
  public accountId?: string;
  public toAccountId?: string;

  constructor(
    description: string,
    date: Date = new Date(),
    accountId?: string,
    toAccountId?: string
  ) {
    this.id = uuidv4();
    this.date = date;
    this.desc = description;
    this.accountId = accountId;
    this.toAccountId = toAccountId;
  }

  register(): void {
    console.log('Transaction registered:', this);
  }

  description(): string {
    return this.desc;
  }

  getId(): string {
    return this.id;
  }

  getDate(): Date {
    return this.date;
  }
}