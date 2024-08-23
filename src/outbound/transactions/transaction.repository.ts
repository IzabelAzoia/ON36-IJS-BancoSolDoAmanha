import { TransactionEntity } from '../../domain/transactions/entities/transaction.Entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TransactionRepository {
  private readonly transactions: Map<string, TransactionEntity> = new Map();

  async findById(id: string): Promise<TransactionEntity | undefined> {
    return this.transactions.get(id);
  }

  async findByAccountId(accountId: string): Promise<TransactionEntity[]> {
    return Array.from(this.transactions.values()).filter(
      transaction => transaction.getAccountId() === accountId || transaction.getToAccountId() === accountId
    );
  }

  async save(transaction: TransactionEntity): Promise<void> {
    this.transactions.set(transaction.getId(), transaction);
  }

  async delete(id: string): Promise<void> {
    this.transactions.delete(id);
  }

  async findAll(): Promise<TransactionEntity[]> {
    return Array.from(this.transactions.values());
  }
}