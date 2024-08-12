import { Injectable } from '@nestjs/common';
import { AccountModel } from '../../accounts/models/account.model';

@Injectable()
export class AccountRepository {
    private readonly accounts: Map<string, AccountModel> = new Map();

    async findById(id: string): Promise<AccountModel | undefined> {
        return this.accounts.get(id);
    }

    async save(account: AccountModel): Promise<void> {
        this.accounts.set(account.getId(), account);
    }

    async delete(id: string): Promise<void> {
        this.accounts.delete(id);
    }

    async findAll(): Promise<AccountModel[]> {
        return Array.from(this.accounts.values());
    }
}
