import { Injectable } from '@nestjs/common';
import { AccountRepository } from 'accounts/repositories/account.repository';
import { TransactionRepository } from 'transactions/repositories/transaction.repository';
import { AccountModel } from 'accounts/models/account.model';
import { TransactionModel } from 'transactions/models/transaction.model';

@Injectable()
export class TransactionsService {
    constructor(
        private readonly accountRepository: AccountRepository,
        private readonly transactionRepository: TransactionRepository,
    ) {}

    async deposit(accountId: string, amount: number): Promise<void> {
        const account = await this.accountRepository.findById(accountId);
        if (!account) {
            throw new Error('Account not found');
        }

        account.deposit(amount);
        await this.accountRepository.save(account);

        const transaction = new TransactionModel(accountId, 'deposit', amount);
        await this.transactionRepository.save(transaction);
    }

    async withdraw(accountId: string, amount: number): Promise<void> {
        const account = await this.accountRepository.findById(accountId);
        if (!account) {
            throw new Error('Account not found');
        }

        account.withdraw(amount);
        await this.accountRepository.save(account);

        const transaction = new TransactionModel(accountId, 'withdraw', amount);
        await this.transactionRepository.save(transaction);
    }

    async transfer(fromAccountId: string, toAccountId: string, amount: number): Promise<void> {
        const fromAccount = await this.accountRepository.findById(fromAccountId);
        if (!fromAccount) {
            throw new Error('From account not found');
        }

        const toAccount = await this.accountRepository.findById(toAccountId);
        if (!toAccount) {
            throw new Error('To account not found');
        }

        fromAccount.withdraw(amount);
        toAccount.deposit(amount);

        await this.accountRepository.save(fromAccount);
        await this.accountRepository.save(toAccount);

        const transaction = new TransactionModel(fromAccountId, 'transfer', amount, toAccountId);
        await this.transactionRepository.save(transaction);
    }

    async getBalance(accountId: string): Promise<number> {
        const account = await this.accountRepository.findById(accountId);
        if (!account) {
            throw new Error('Account not found');
        }
        return account.getBalance();
    }
}
