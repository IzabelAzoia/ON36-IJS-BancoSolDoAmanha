import { Module } from '@nestjs/common';
import { TransactionRepository } from '../../outbound/transactions/transaction.repository';
import { TransactionService } from 'src/domain/transactions/services/transaction.service';
import { TransactionController } from '../../inbound/controllers/transaction.controller';
import { AccountRepository } from 'src/domain/accounts/repositories/account.repository';

@Module({
  imports: [],
  controllers: [TransactionController],
  providers: [TransactionService, TransactionRepository, AccountRepository],
  exports: [TransactionService],
})
export class TransactionModule {}

