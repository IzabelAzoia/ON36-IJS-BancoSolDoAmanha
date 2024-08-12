import { CheckingAccount } from '../../../accounts/models/checking-account.model';
import { SavingsAccount } from '../../../accounts/models/savings-account.model';
import { ClientData } from '../../../clients/models/client-data.model';
import { AccountType } from '../../../accounts/enums/account-type.enum';
import { ClientAccountManager } from '../../../clients/models/client-account-manager.model';

describe('ClientAccountManager', () => {
  let accountManager: ClientAccountManager;
  let checkingAccount: CheckingAccount;
  let savingsAccount: SavingsAccount;

  beforeEach(() => {
      accountManager = new ClientAccountManager();
      checkingAccount = new CheckingAccount('1', { name: 'John Doe' } as ClientData, 1000, AccountType.Checking);
      savingsAccount = new SavingsAccount('2', { name: 'Jane Doe' } as ClientData, 2000, AccountType.Savings);
      accountManager.addAccount(checkingAccount);
      accountManager.addAccount(savingsAccount);
  });

  test('should add and retrieve accounts', () => {
      expect(accountManager.getAccount('1')).toBe(checkingAccount);
      expect(accountManager.getAccount('2')).toBe(savingsAccount);
  });

  test('should remove account correctly', () => {
      accountManager.removeAccount('1');
      expect(accountManager.getAccount('1')).toBeUndefined();
  });
});
