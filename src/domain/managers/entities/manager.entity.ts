import { UserInterface } from '../../users/user.interface';
import { ClientManagementService } from '../../clients/services/client-management.service';
import { AccountManagementService } from '../../accounts/services/account-management.service';
import { UserType } from '../../users/user-types.enum';
import { UserStatus } from '../../users/user.status.enum';

export class ManagerEntity implements UserInterface {
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
        return `User Data: ${this.name}, ${this.email}`;
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