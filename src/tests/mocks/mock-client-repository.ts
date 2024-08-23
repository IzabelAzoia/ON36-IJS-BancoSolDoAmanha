import { ClientInterface } from '../../domain/clients/client.interface';
import { UserType } from '../../domain/users/user-types.enum';
import { ClientRepositoryInterface } from '../../outbound/clients/cliente-repositoy.interface';

export const mockClientRepository: jest.Mocked<ClientRepositoryInterface> = {
  findById: jest.fn().mockResolvedValue({
    id: 'clientId',
    name: 'John Doe',
    password: 'password',
    birthDate: new Date().toISOString(),
    cpf: '12345678900',
    address: '123 Main St',
    email: 'johndoe@example.com',
    userType: UserType.Client,
    accounts: [],
    getStatement: jest.fn(),
    checkBalance: jest.fn(),
  } as ClientInterface),
  save: jest.fn().mockResolvedValue(undefined),
  delete: jest.fn().mockResolvedValue(undefined),
  findAll: jest.fn().mockResolvedValue([
    {
      id: 'clientId',
      name: 'John Doe',
      password: 'password',
      birthDate: new Date().toISOString(),
      cpf: '12345678900',
      address: '123 Main St',
      email: 'johndoe@example.com',
      userType: UserType.Client,
      accounts: [],
      getStatement: jest.fn(),
      checkBalance: jest.fn(),
    } as ClientInterface,
  ]),
};