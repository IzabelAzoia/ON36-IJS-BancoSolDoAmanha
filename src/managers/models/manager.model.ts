import { UserInterface } from '../../users/interfaces/user.interface';
import { ClientManagementService } from '../../clients/services/client-management.service';
import { AccountManagementService } from '../../accounts/services/account-management.service';
import { UserType } from '../../users/enums/user-types.enum';
import { UserStatus } from '../../users/enums/user.status.enum';
import { AccountType } from 'src/accounts/enums/account-type.enum';
import { ClientData } from 'src/clients/models/client-data.model';
import { CheckingAccount } from 'src/accounts/models/checking-account.model';
import { SavingsAccount } from 'src/accounts/models/savings-account.model';

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
    public email: string;
    private accountService: AccountManagementService;
    public clientService: ClientManagementService;

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
        email: string,
        clientService: ClientManagementService,
        accountService: AccountManagementService
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
        this.email = email;
        this.clientService = clientService;
        this.accountService = accountService;
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
    ): void {
        const client = this.clientService.findClientById(clientId);
        if (!client) {
            throw new Error('Client not found');
        }

        const account = this.accountService.createAccount(this.id, type, client, balance, extraParam);
        this.accountService.addAccount(client, account);
    }

    addClient(client: ClientData): void {
        this.clientService.addClient(client);
    }

    removeClient(clientId: string): void {
        this.clientService.removeClient(clientId);
    }
    addAccount(clientId: string, account: CheckingAccount | SavingsAccount): void {
        // Implementação para adicionar uma conta ao cliente
    }
}

