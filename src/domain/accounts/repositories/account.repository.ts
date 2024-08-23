import { Injectable } from '@nestjs/common';
import { AccountEntity } from '../../accounts/entities/account.entity';

@Injectable()
export class AccountRepository {
    private readonly accounts: Map<string, AccountEntity> = new Map();

    async findById(id: string): Promise<AccountEntity | undefined> {
        return this.accounts.get(id);
    }

    async save(account: AccountEntity): Promise<void> {
        this.accounts.set(account.id, account);
    }

    async delete(id: string): Promise<void> {
        this.accounts.delete(id);
    }

    async findAll(): Promise<AccountEntity[]> {
        return Array.from(this.accounts.values());
    }
}
