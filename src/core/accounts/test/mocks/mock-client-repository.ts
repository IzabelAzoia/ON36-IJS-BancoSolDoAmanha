import { IClientRepositoryInterface } from '../../interfaces/i-cliente-repositoy.interface';
import { UserInterface } from '../../interfaces/user.interface';
import { UserType } from '../../enums/user-types.enum';
import { ClientInterface } from '../../interfaces/client.interface';

export const mockClientRepository: jest.Mocked<IClientRepositoryInterface> = {
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