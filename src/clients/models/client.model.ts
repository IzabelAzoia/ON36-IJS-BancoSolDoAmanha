import { UserInterface } from 'user/interfaces/user.interface';
import { UserType } from 'user/enums/user-types.enum';
import { UserStatus } from 'user/enums/user.status.enum';
import { AccountInterface } from 'accounts/interfaces/account.interface';
import { ManagerService } from 'managers/services/manager.service';
import { ManagerModel } from 'managers/models/manager.model';
import { ClientInterface } from 'clients/interfaces/client.interface';
import { Statement } from '../interfaces/statement.interface';

export class ClientModel implements UserInterface {
    getStatement(): Statement {
        return {
          generateStatement: () => {
            return ['Statement line 1', 'Statement line 2'];
          },
        };
      }
    
      checkBalance(): number {
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
    async findManagerById(managerService: ManagerService): Promise<ManagerModel | undefined> {
        return managerService.findManagerById(this.managerId);
    }
    addAccount(account: AccountInterface): void {
        this.accounts.push(account);
    }

    removeAccount(accountId: string): void {
        this.accounts = this.accounts.filter(acc => acc.id !== accountId);
    }

    findAccount(accountId: string): AccountInterface | undefined {
        return this.accounts.find(acc => acc.id === accountId);
    }

    getUserData(): string {
        return `Name: ${this.name}, Address: ${this.address}, Phone: ${this.phone}, CPF: ${this.cpf}`;
    }

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