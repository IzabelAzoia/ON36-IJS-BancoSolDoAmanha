import { AccountModel } from '../../../accounts/models/account.model';
import { AccountInterface } from '../../../accounts/interfaces/account.interface';
import { ClientData } from '../../../clients/models/client-data.model';
import { AccountType } from '../../../accounts/enums/account-type.enum';
import { ConcreteAccount } from '../../../accounts/models/concrete-account.model';

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

    test('should implement AccountInterface', () => {
        expect(account.deposit).toBeDefined();
        expect(account.withdraw).toBeDefined();
        expect(account.transfer).toBeDefined();
        expect(account.checkBalance).toBeDefined();
        expect(account.generateStatement).toBeDefined();
    });
});