import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from '../../../inbound/dtos/create-transaction.dto';
import { TransactionEntity } from '../entities/transaction.Entity';
import { AccountRepository } from 'src/domain/accounts/repositories/account.repository';
import { TransactionRepository } from 'src/outbound/transactions/transaction.repository';

@Injectable()
export class TransactionService {
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

    const transactionDto = new CreateTransactionDto(accountId, amount,'Depositing funds', 'deposit');
    const transaction = new TransactionEntity(transactionDto);
    await this.transactionRepository.save(transaction);
  }

  async withdraw(accountId: string, amount: number): Promise<void> {
    const account = await this.accountRepository.findById(accountId);
    if (!account) {
      throw new Error('Account not found');
    }

    account.withdraw(amount);
    await this.accountRepository.save(account);

    // Corrigido: "Withdraw" -> "withdraw"
    const transactionDto = new CreateTransactionDto(accountId, amount, 'Withdrawing funds', 'withdraw');
    const transaction = new TransactionEntity(transactionDto);
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

    const transactionDto = new CreateTransactionDto(fromAccountId, amount, 'Transferring funds', 'transfer');
    const transaction = new TransactionEntity(transactionDto);
    await this.transactionRepository.save(transaction);
  }
}