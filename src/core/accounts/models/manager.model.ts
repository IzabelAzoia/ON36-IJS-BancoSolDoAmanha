import { UserInterface } from '../interfaces/user.interface';
import { Client } from '../models/client.model';
import { UserType } from '../enums/user-types.enum';
import { UserStatus } from '../enums/user.status.enum';
import { AccountType } from '../enums/account.enum';
import { AccountFactory } from '../factories/account.factory';
import { AccountInterface } from '../interfaces/account.interface';

export class Manager implements UserInterface {
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
    public clients: Client[] = [];

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
        // Get client by ID
        const client = this.clients.find(c => c.id === clientId);
        if (!client) {
            throw new Error('Client not found');
        }

        // Create account using the factory
        return this.accountFactory.createAccount(this.id, type, client, balance, extraParam);
    }

    addClient(client: Client): void {
        this.clients.push(client);
    }

    removeClient(clientId: string): void {
        this.clients = this.clients.filter(client => client.id !== clientId);
    }

    addAccount(clientId: string, account: AccountInterface): void {
        // Get client by ID
        const client = this.clients.find(c => c.id === clientId);
        if (!client) {
            throw new Error('Client not found');
        }

        client.accounts.push(account);
    }
}
