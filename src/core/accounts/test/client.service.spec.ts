import { describe, beforeEach, it, expect, jest } from '@jest/globals';
import { ClientService } from '../services/client.service';
import { IClientRepositoryInterface } from '../interfaces/i-cliente-repositoy.interface';
import { mockClientRepository } from './mocks/mock-client-repository';
import { ClientInterface } from '../interfaces/client.interface';
import { Client } from '../models/client.model';

// Configuração para usar o mock automaticamente
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
