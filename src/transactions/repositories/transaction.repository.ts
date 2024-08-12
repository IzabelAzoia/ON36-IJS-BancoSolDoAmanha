import { TransactionModel } from '../../transactions/models/transacao.model';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TransactionRepository {
    private readonly transactions: Map<string, TransactionModel> = new Map();

    async findById(id: string): Promise<TransactionModel | undefined> {
        return this.transactions.get(id);
    }

    async findByAccountId(accountId: string): Promise<TransactionModel[]> {
        return Array.from(this.transactions.values()).filter(
            transaction => transaction.accountId === accountId || transaction.toAccountId === accountId
        );
    }

    async save(transaction: TransactionModel): Promise<void> {
        this.transactions.set(transaction.getId(), transaction);
    }

    async delete(id: string): Promise<void> {
        this.transactions.delete(id);
    }

    async findAll(): Promise<TransactionModel[]> {
        return Array.from(this.transactions.values());
    }
}