// src/infrastructure/types.ts
const TYPES = {
    IAccountRepository: Symbol.for('IAccountRepository'),
    IClientRepository: Symbol.for('IClientRepository'),
    IManagerRepository: Symbol.for('IManagerRepository'),
    IUserRepository: Symbol.for('IUserRepository'),
    ITransactionRepository: Symbol.for('ITransactionRepository'),
    AccountService: Symbol.for('AccountService'),
    ClientService: Symbol.for('ClientService'),
    ManagerService: Symbol.for('ManagerService'),
    UserService: Symbol.for('UserService'),
    TransactionService: Symbol.for('TransactionService'),
  };
  
  export { TYPES };
  