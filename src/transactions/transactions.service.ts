import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from '../core/dtos/create-transaction.dto';

@Injectable()
export class TransactionsService {
  private readonly transactions: CreateTransactionDto[] = [];

  create(createTransactionDto: CreateTransactionDto): string {
    this.transactions.push(createTransactionDto);
    return 'Transaction added!';
  }

  findAll(): CreateTransactionDto[] {
    return this.transactions;
  }
}
