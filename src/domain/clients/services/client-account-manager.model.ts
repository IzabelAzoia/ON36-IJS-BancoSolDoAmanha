import { AccountInterface } from '../../accounts/account.interface';

export class ClientAccountManager {
    private accounts: AccountInterface[] = [];

    addAccount(account: AccountInterface): void {
        this.accounts.push(account);
    }

    removeAccount(accountId: string): void {
        this.accounts = this.accounts.filter(acc => acc.id !== accountId);
    }

    findAccount(accountId: string): AccountInterface | undefined {
        return this.accounts.find(acc => acc.id === accountId);
    }
    getAccount(accountId: string): AccountInterface | undefined {
        return this.accounts.find(acc => acc.id === accountId);
    }
}
