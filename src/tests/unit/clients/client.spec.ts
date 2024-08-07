import { describe, beforeEach, it, expect, jest } from '@jest/globals';
import { ClientService } from '../../../clients/services/client.service';
import { IClientRepositoryInterface } from 'clients/interfaces/i-cliente-repositoy.interface';
import { mockClientRepository } from 'tests/mocks/mock-client-repository';
import { ClientInterface } from 'clients/interfaces/client.interface';
import { ClientModel } from 'clients/models/client.model';

jest.mock('../repositories/client.repository');

describe('ClientService', () => {
  let clientService: ClientService;

  beforeEach(() => {
    clientService = new ClientService(mockClientRepository);
  });

  it('should find a client by id', async () => {
    const client: ClientInterface = await clientService.findById('clientId');
    expect(client).toEqual({
      id: 'clientId',
      name: 'John Doe',
      password: 'password',
      birthDate: new Date().toISOString(),
      cpf: '12345678900',
      address: '123 Main St',
      email: 'johndoe@example.com',
      accounts: [],
      getStatement: expect.any(Function),
      checkBalance: expect.any(Function),
    });
  });
});
