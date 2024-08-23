import { Controller, Post, Body } from '@nestjs/common';
import { TransactionService } from 'src/domain/transactions/services/transaction.service';
import { DepositDto } from '../dtos/deposit.dto';
import { WithdrawDto } from '../dtos/withdraw.dto';
import { TransferDto } from '../dtos/transfer.dto';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post('deposit')
  async deposit(@Body() depositDto: DepositDto): Promise<void> {
    return await this.transactionService.deposit(depositDto.accountId, depositDto.amount);
  }
  
  @Post('withdraw')
  async withdraw(@Body() withdrawDto: WithdrawDto): Promise<void> {
    return await this.transactionService.withdraw(withdrawDto.accountId, withdrawDto.amount);
  }
  
  @Post('transfer')
  async transfer(@Body() transferDto: TransferDto): Promise<void> {
    return await this.transactionService.transfer(transferDto.fromAccountId, transferDto.toAccountId, transferDto.amount);
  }
}