import { Module } from '@nestjs/common';
import { AccountFactory } from 'accounts/factories/account.factory';
import { CheckingAccount } from './checking-account.model';
import { SavingsAccount } from './savings-account.model';
import { UserService } from 'user/services/user.service';
import { UserFactory } from 'user/factories/user.factory';

@Module({
    providers: [AccountFactory, CheckingAccount, SavingsAccount, UserService, UserFactory],
    exports: [AccountFactory, UserService]
})
export class AccountModule {}