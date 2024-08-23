
import { ClientEntity } from '../../../domain/clients/entities/client.entity';
import { AccountType } from '../../../domain/accounts/account-type.enum';
import { ConcreteAccount } from '../../../domain/accounts/concrete-account.model';

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
});