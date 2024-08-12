import { TransactionService } from '../../transactions/services/transaction.service';
import { Controller, Post, Body } from '@nestjs/common'; 
import { CreateTransactionDto } from '../dtos/create-transaction.dto';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post('create')
  createTransaction(@Body() createTransactionDto: CreateTransactionDto): string {
    return this.transactionService.create(createTransactionDto);
  }
}