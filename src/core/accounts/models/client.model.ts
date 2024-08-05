import { UserInterface } from '../interfaces/user.interface';
import { UserType } from '../enums/user-types.enum';
import { UserStatus } from '../enums/user.status.enum';
import { AccountInterface } from '../interfaces/account.interface';
import { ManagerService } from '../services/manager.service';
import { Manager } from './manager.model';
import { ClientInterface } from '../interfaces/client.interface';
import { Statement } from '../interfaces/statement.interface';

export class Client implements UserInterface {
    getStatement(): Statement {
        return {
          generateStatement: () => {
            // Implementação de exemplo
            return ['Statement line 1', 'Statement line 2'];
          },
          // Outras propriedades e métodos, se houver
        };
      }
    
      checkBalance(): number {
        // Implementação de exemplo
        return 100;
      }
    userType: UserType = UserType.Client;
    accounts: AccountInterface[] = [];
    id: string;
    name: string;
    email: string;
    password: string;
    birthDate: string;
    cpf: string;
    phone: string;
    address: string;
    userStatus: UserStatus;
    managerId?: string;

    constructor(
        id: string,
        name: string,
        email: string,
        password: string,
        birthDate: string,
        cpf: string,
        phone: string,
        address: string,
        userStatus?: UserStatus
    ) {
        this.id = id;
        this.name = name;
        this. email =  email,
        this.password = password;
        this.birthDate = birthDate;
        this.cpf = cpf;
        this.phone = phone;
        this.address = address;
        this.userStatus = userStatus;
        this.managerId = '';
    }
    async findManagerById(managerService: ManagerService): Promise<Manager | undefined> {
        return managerService.findManagerById(this.managerId);
    }
    // Add an account to the client
    addAccount(account: AccountInterface): void {
        this.accounts.push(account);
    }

    // Remove an account from the client
    removeAccount(accountId: string): void {
        this.accounts = this.accounts.filter(acc => acc.id !== accountId);
    }

    // Find an account by ID
    findAccount(accountId: string): AccountInterface | undefined {
        return this.accounts.find(acc => acc.id === accountId);
    }

    // Retrieve client data
    getUserData(): string {
        return `Name: ${this.name}, Address: ${this.address}, Phone: ${this.phone}, CPF: ${this.cpf}`;
    }

    // Implement methods from User interface
    authenticateUser(password: string): boolean {
        return this.password === password;
    }

    updateUser(name: string, address: string, phone: string, password: string): void {
        this.name = name;
        this.address = address;
        this.phone = phone;
        this.password = password;
    }
}