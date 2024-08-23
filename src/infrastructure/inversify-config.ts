// src/infrastructure/inversify.config.ts
import { Container } from 'inversify';
import { TYPES } from './types';
import { AccountRepositoryAdapter } from './adapters/AccountRepositoryAdapter';
import { ClientRepositoryAdapter } from './adapters/ClientRepositoryAdapter';
import { ManagerRepositoryAdapter } from './adapters/ManagerRepositoryAdapter';
import { UserRepositoryAdapter } from './adapters/UserRepositoryAdapter';
import { TransactionRepositoryAdapter } from './adapters/TransactionRepositoryAdapter';
import { AccountService } from '../domain/account/services/AccountService';
import { ClientService } from '../domain/clients/services/ClientService';
import { ManagerService } from '../domain/managers/services/ManagerService';
import { UserService } from '../domain/users/services/UserService';
import { TransactionService } from '../domain/transactions/services/TransactionService';

const container = new Container();

container.bind<IAccountRepository>(TYPES.IAccountRepository).to(AccountRepositoryAdapter);
container.bind<IClientRepository>(TYPES.IClientRepository).to(ClientRepositoryAdapter);
container.bind<IManagerRepository>(TYPES.IManagerRepository).to(ManagerRepositoryAdapter);
container.bind<IUserRepository>(TYPES.IUserRepository).to(UserRepositoryAdapter);
container.bind<ITransactionRepository>(TYPES.ITransactionRepository).to(TransactionRepositoryAdapter);
container.bind<AccountService>(TYPES.AccountService).to(AccountService);
container.bind<ClientService>(TYPES.ClientService).to(ClientService);
container.bind<ManagerService>(TYPES.ManagerService).to(ManagerService);
container.bind<UserService>(TYPES.UserService).to(UserService);
container.bind<TransactionService>(TYPES.TransactionService).to(TransactionService);

export { container };
