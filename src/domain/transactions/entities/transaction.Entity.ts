import { v4 as uuidv4 } from 'uuid';
import { TransactionInterface } from '../transaction.interface';
import { CreateTransactionDto } from '../../../inbound/dtos/create-transaction.dto';

export class TransactionEntity implements TransactionInterface {
  
  private id: string;
  private date: Date;
  private description: string;
  private accountId?: string;
  private toAccountId?: string;

  constructor(dto: CreateTransactionDto) {
    this.id = uuidv4();
    this.date = dto.date;
    this.description = dto.description;
    this.accountId = dto.accountId;
    this.toAccountId = dto.toAccountId;
  }
  public getAccountId(): string {
    return this.accountId;
}

  public getToAccountId(): string {
    return this.toAccountId;
}

  register(): void {
    console.log('Transaction registered:', this);
  }

  getDescription(): string {
    return this.description;
  }

  getId(): string {
    return this.id;
  }

  getDate(): Date {
    return this.date;
  }
}
