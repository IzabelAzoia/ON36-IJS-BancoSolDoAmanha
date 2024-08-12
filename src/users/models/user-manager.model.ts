import { User } from './user.model';
import { UserAuthentication } from './user-authentication.model';
import { UserType } from '../enums/user-types.enum';
import { UserStatus } from '../enums/user.status.enum';

export class UserManager extends User {
    private authentication: UserAuthentication;
    private static userDatabase: Map<string, User> = new Map();

    constructor(
        id: string,
        name: string,
        birthDate: string,
        cpf: string,
        phone: string,
        address: string,
        userType: UserType,
        userStatus: UserStatus,
        password: string
    ) {
        super(id, name, birthDate, cpf, phone, address, userType, userStatus);
        this.authentication = new UserAuthentication(password);
    }

    authenticateUser(password: string): boolean {
        return this.authentication.authenticate(password);
    }

    updateUser(name: string, address: string, phone: string, password: string): void {
        super.updateUser(name, address, phone, password);
        this.authentication.updatePassword(password);
    }
}

