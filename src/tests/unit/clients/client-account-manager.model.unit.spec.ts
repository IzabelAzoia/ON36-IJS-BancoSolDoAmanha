import { CheckingAccount } from '../../../domain/accounts/checking-account.model';
import { SavingsAccount } from '../../../domain/accounts/savings-account.model';
import { ClientEntity } from '../../../domain/clients/entities/client.entity';
import { AccountType } from '../../../domain/accounts/account-type.enum';

describe('ClientAccountManager', () => {
    let checkingAccount: CheckingAccount;
    let savingsAccount: SavingsAccount;
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

        checkingAccount = new CheckingAccount(
            '1',
            1000,
            client,
            500, // overdraftLimit
            AccountType.Checking,
            new Date(), // createdDate
            'John Doe' // accountHolderName
        );

        savingsAccount = new SavingsAccount(
            '2',
            2000,
            client,
            0.05, // interestRate
            AccountType.Savings,
            new Date() // createdDate
        );
    });

    test('should create CheckingAccount with correct properties', () => {
        expect(checkingAccount.id).toBe('1');
        expect(checkingAccount.client).toBe(client);
        expect(checkingAccount.balance).toBe(1000);
        expect(checkingAccount.accountType).toBe(AccountType.Checking);
        expect(checkingAccount.overdraftLimit).toBe(500);
        expect(checkingAccount.accountHolderName).toBe('John Doe');
    });

    test('should create SavingsAccount with correct properties', () => {
        expect(savingsAccount.id).toBe('2');
        expect(savingsAccount.client).toBe(client);
        expect(savingsAccount.balance).toBe(2000);
        expect(savingsAccount.accountType).toBe(AccountType.Savings);
        expect(savingsAccount.interestRate).toBe(0.05);
    });
});