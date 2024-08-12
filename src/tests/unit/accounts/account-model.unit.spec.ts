import { ConcreteAccount } from '../../../accounts/models/concrete-account.model';
import { ClientData } from '../../../clients/models/client-data.model';
import { AccountType } from '../../../accounts/enums/account-type.enum';

describe('ConcreteAccount', () => {
    let account: ConcreteAccount;
    let client: ClientData;

    beforeEach(() => {
        client = new ClientData(
            'client-id',
            'Client Name',
            'email@example.com',
            'password123',
            '01-01-1990',
            '123.456.789-00',
            '123-456-7890',
            '123 Main St'
        );
        account = new ConcreteAccount('account-id', client, 100, AccountType.Checking);
    });

    test('should deposit money correctly', () => {
        account.deposit(50);
        expect(account.checkBalance()).toBe(150);
    });

    test('should withdraw money correctly', () => {
        account.withdraw(30);
        expect(account.checkBalance()).toBe(70);
    });

    test('should throw error on insufficient funds', () => {
        expect(() => account.withdraw(200)).toThrow('Insufficient funds');
    });

    test('should throw error on negative deposit', () => {
        expect(() => account.deposit(-10)).toThrow('Deposit amount must be positive');
    });

    test('should throw error on negative withdrawal', () => {
        expect(() => account.withdraw(-10)).toThrow('Withdrawal amount must be positive');
    });

    test('should generate a statement', () => {
        const statement = account.generateStatement();
        expect(statement).toBe('Statement line 1');
    });
});