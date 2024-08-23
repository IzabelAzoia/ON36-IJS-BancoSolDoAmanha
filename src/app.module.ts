import { Module } from '@nestjs/common';
import { AccountService } from './domain/accounts/services/account.service';
import { AccountFactory } from './domain/accounts/account.factory';

@Module({
  imports: [],
  controllers: [],
  providers: [AccountService, AccountFactory],
})
export class AppModule {}