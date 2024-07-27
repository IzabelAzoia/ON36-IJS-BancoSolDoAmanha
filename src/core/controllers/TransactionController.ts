import { TransactionsService } from './../../transactions/transactions.service';
import { Controller, Post, Body } from '@nestjs/common'; 
import { CreateTransactionDto } from '../dtos/create-transaction.dto';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionsService) {}

  @Post('create')
  createTransaction(@Body() createTransactionDto: CreateTransactionDto): string {
    return this.transactionService.create(createTransactionDto);
  }
}