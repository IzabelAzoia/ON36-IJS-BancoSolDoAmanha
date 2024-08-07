import { Module } from '@nestjs/common';
import { AccountService } from './accounts/services/account.service';
import { AccountFactory } from './factories/account.factory';

@Module({
  imports: [],
  controllers: [],
  providers: [AccountService, AccountFactory],
})
export class AppModule {}