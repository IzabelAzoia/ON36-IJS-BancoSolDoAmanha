import { ConcreteAccount } from '../../../domain/accounts/concrete-account.model';
import { ClientEntity } from '../../../domain/clients/entities/client.entity';
import { AccountType } from '../../../domain/accounts/account-type.enum';

describe('ConcreteAccount', () => {
    let account: ConcreteAccount;
    let client: ClientEntity;

    beforeEach(() => {
        client = new ClientEntity(
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

    test('should implement AccountInterface', () => {
        expect(account.deposit).toBeDefined();
        expect(account.withdraw).toBeDefined();
        expect(account.transfer).toBeDefined();
        expect(account.checkBalance).toBeDefined();
        expect(account.generateStatement).toBeDefined();
    });

    test('should deposit funds correctly', () => {
        account.deposit(50);
        expect(account.checkBalance()).toBe(150);
    });

    test('should withdraw funds correctly', () => {
        const success = account.withdraw(50);
        expect(success).toBe(true);
        expect(account.checkBalance()).toBe(50);
    });

    test('should not withdraw more than balance', () => {
        const success = account.withdraw(150);
        expect(success).toBe(false);
        expect(account.checkBalance()).toBe(100);
    });

    test('should transfer funds correctly', () => {
        const destinationAccount = new ConcreteAccount('destination-id', client, 100, AccountType.Checking);
        const success = account.transfer(destinationAccount, 50);
        expect(success).toBe(true);
        expect(account.checkBalance()).toBe(50);
        expect(destinationAccount.checkBalance()).toBe(150);
    });
});    