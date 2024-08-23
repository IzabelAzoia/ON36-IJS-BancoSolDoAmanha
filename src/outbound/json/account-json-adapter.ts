import * as fs from 'fs';
import * as path from 'path';
import { IAccountRepository } from '../../domain/account/repositories/IAccountRepository';
import { Account } from '../../domain/account/entities/account.entity';

const ACCOUNT_FILE_PATH = path.join(__dirname, '../../../data/accounts.json');

export class AccountJsonAdapter implements IAccountRepository {
  private readData(): Account[] {
    if (!fs.existsSync(ACCOUNT_FILE_PATH)) {
      return [];
    }
    const data = fs.readFileSync(ACCOUNT_FILE_PATH, 'utf-8');
    return JSON.parse(data) as Account[];
  }

  private writeData(accounts: Account[]): void {
    fs.writeFileSync(ACCOUNT_FILE_PATH, JSON.stringify(accounts, null, 2));
  }

  async findAll(): Promise<Account[]> {
    return this.readData();
  }

  async findById(id: string): Promise<Account | undefined> {
    const accounts = this.readData();
    return accounts.find(account => account.id === id);
  }

  async save(account: Account): Promise<void> {
    const accounts = this.readData();
    const existingAccountIndex = accounts.findIndex(a => a.id === account.id);
    if (existingAccountIndex >= 0) {
      accounts[existingAccountIndex] = account;
    } else {
      accounts.push(account);
    }
    this.writeData(accounts);
  }

  async delete(id: string): Promise<void> {
    let accounts = this.readData();
    accounts = accounts.filter(account => account.id !== id);
    this.writeData(accounts);
  }
}

