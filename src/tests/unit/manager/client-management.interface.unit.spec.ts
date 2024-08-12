import { ClientAccountManager } from '../../../clients/models/client-account-manager.model';
import { AccountInterface } from '../../../accounts/interfaces/account.interface';

let accountManager: ClientAccountManager;
let account: AccountInterface;

beforeEach(() => {
    accountManager = new ClientAccountManager();
    account = {
        id: '1',
        deposit: (amount: number) => {
        },
        withdraw: (amount: number) => {
            return true;
        },
        checkBalance: () => {
            return 1000;
        },
        transfer: (destinationAccount: AccountInterface, amount: number) => {
            return true;
        },
        receiveTransfer: (amount: number) => {
        },
        generateStatement: () => {
            return 'Statement';
        },
        getAccountId: () => {
            return '1';
        }
    }
});

test('should add an account', () => {
    accountManager.addAccount(account);
    expect(accountManager.getAccount(account.id)).toEqual(account);
});

test('should remove an account', () => {
    accountManager.addAccount(account);
    accountManager.removeAccount(account.id);
    expect(accountManager.getAccount(account.id)).toBeUndefined();
});

test('should find an account', () => {
    accountManager.addAccount(account);
    expect(accountManager.findAccount(account.id)).toEqual(account);
});


