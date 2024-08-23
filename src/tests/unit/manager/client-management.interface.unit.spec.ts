import { AccountManagementService } from '../../../domain/accounts/services/account-management.service';
import { AccountFactory } from '../../../domain/accounts/account.factory'; // Ajuste o caminho conforme necessário
import { ClientEntity } from '../../../domain/clients/entities/client.entity';
import { CheckingAccount } from '../../../domain/accounts/checking-account.model'; // Ajuste o caminho conforme necessário
import { AccountService } from '../../../domain/accounts/services/account.service';
import { ClientService } from '../../../domain/clients/services/client.service';

describe('AccountManagementService', () => {
    let accountManagementService: AccountManagementService;
    let accountFactory: AccountFactory;
    let clientService: ClientService;
    let accountService: AccountService;
  
    beforeEach(() => {
      clientService = {} as ClientService; // Mock
      accountService = {} as AccountService; // Mock
      accountFactory = new AccountFactory(clientService, accountService);
      accountManagementService = new AccountManagementService(accountFactory);
    });
  
    it('should add and remove an account', () => {
      const client = new ClientEntity('clientId', 'Client Name', 'email@example.com', 'password', new Date(), 'cpf', 'phone', 'address', 'managerId', 'userStatus');
      const account = new CheckingAccount(client, 'accountId', 1000, 'otherParam');
      
  
      // Adicionar conta
      accountManagementService.addAccount(client, account);
      expect(accountManagementService.getAccount(account.id)).toEqual(account);
  
      // Remover conta
      accountManagementService.removeAccount(account.id);
      expect(accountManagementService.getAccount(account.id)).toBeUndefined();
    });
  
    // Adicione outros testes conforme necessário
  });