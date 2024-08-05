import { account } from '../core/accounts/interfaces/account.interface';
import { Controller, Get, Post, Body, Param, ParseIntPipe, ParseFloatPipe, Delete } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from '../core/accounts/dtos/create-transaction.dto';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  create(@Body() createTransactionDto: CreateTransactionDto) {
    return this.transactionsService.create(createTransactionDto);
  }

  @Get()
  findAll() {
    return this.transactionsService.findAll();
  }

  @Put(':id')
  updateTransaction(
  @Param('id', ParseIntPipe) id: string, 
  @Body('amount', ParseFloatPipe) amount: number,
  @Body('type') type: TransactionType,
  @Body('date') date: Date,
  ): Transaction {
    const newTransaction = new TransactionsController(id, amount, type, date);
    return this.transactionsService.updateTransaction(newTransaction);
  }

  @Delete(':id')
  removeTransaction(@Param('id', ParseIntPipe) id: string): void {
    return this.transactionsService.removeTransation(id);
  }
}
