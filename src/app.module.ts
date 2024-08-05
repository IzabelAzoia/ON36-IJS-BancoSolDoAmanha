import { Module } from '@nestjs/common';
import { AccountService } from './core/accounts/services/account.service';
import { AccountFactory } from './core/accounts/factories/account.factory';

@Module({
  imports: [],
  controllers: [],
  providers: [AccountService, AccountFactory],
})
export class AppModule {}