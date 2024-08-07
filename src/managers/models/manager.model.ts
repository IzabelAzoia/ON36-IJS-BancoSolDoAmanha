import { UserInterface } from 'user/interface/user.interface';
import { ClientModel } from 'clients/models/client.model';
import { UserType } from 'user/enums/user-types.enum';
import { UserStatus } from 'user/enums/user.status.enum';
import { AccountType } from 'accounts/enums/account.enum';
import { AccountFactory } from 'accounts/factories/account.factory';
import { AccountInterface } from 'accounts/interfaces/account.interface';

export class ManagerModel implements UserInterface {
    public id: string;
    public role: string; 
    public name: string;
    public password: string;
    public birthDate: string;
    public cpf: string;
    public phone: string;
    public address: string;
    public userType: UserType = UserType.Manager;
    public userStatus: UserStatus;
    public clients: ClientModel[] = [];

    constructor(
        id: string,
        role: string,
        name: string,
        password: string,
        birthDate: string,
        cpf: string,
        phone: string,
        address: string,
        userStatus: UserStatus,
        private accountFactory: AccountFactory
    ) {
        this.id = id;
        this.role = role; 
        this.name = name;
        this.password = password;
        this.birthDate = birthDate;
        this.cpf = cpf;
        this.phone = phone;
        this.address = address;
        this.userStatus = userStatus;
    }
    getUserData(): string {
        throw new Error('Method not implemented.');
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

    createAccount(
        type: AccountType,
        clientId: string,
        balance: number,
        extraParam?: number
    ): AccountInterface {
        const client = this.clients.find(c => c.id === clientId);
        if (!client) {
            throw new Error('Client not found');
        }

        return this.accountFactory.createAccount(this.id, type, client, balance, extraParam);
    }

    addClient(client: ClientModel): void {
        this.clients.push(client);
    }

    removeClient(clientId: string): void {
        this.clients = this.clients.filter(client => client.id !== clientId);
    }

    addAccount(clientId: string, account: AccountInterface): void {
        const client = this.clients.find(c => c.id === clientId);
        if (!client) {
            throw new Error('Client not found');
        }

        client.accounts.push(account);
    }
}
