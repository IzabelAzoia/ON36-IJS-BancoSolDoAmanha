import { Module } from '@nestjs/common';
import { AccountFactory } from './account.factory';
import { CheckingAccount } from './checking-account.model';
import { SavingsAccount } from './savings-account.model';
import { UserFactory } from '../users/user.factory';
import { UserService } from 'src/domain/users/services/user.service';

@Module({
    providers: [AccountFactory, CheckingAccount, SavingsAccount, UserService, UserFactory],
    exports: [AccountFactory, UserService]
})
export class AccountModule {}