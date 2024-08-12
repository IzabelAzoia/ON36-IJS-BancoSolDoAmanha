import { UserDetailsInterface } from '../interfaces/user.interface';
import { UserType } from '../enums/user-types.enum';
import { UserStatus } from '../enums/user.status.enum';

export class User implements UserDetailsInterface {
    protected id: string;
    protected name: string;
    protected birthDate: string;
    protected cpf: string;
    protected phone: string;
    protected address: string;
    protected userType: UserType;
    protected userStatus: UserStatus;

    constructor(
        id: string,
        name: string,
        birthDate: string,
        cpf: string,
        phone: string,
        address: string,
        userType: UserType,
        userStatus: UserStatus
    ) {
        this.id = id;
        this.name = name;
        this.birthDate = birthDate;
        this.cpf = cpf;
        this.phone = phone;
        this.address = address;
        this.userType = userType;
        this.userStatus = userStatus;
    }

    getUserData(): string {
        return `Name: ${this.name}, Address: ${this.address}, Phone: ${this.phone}, CPF: ${this.cpf}`;
    }

    updateUser(name: string, address: string, phone: string, password: string): void {
        this.name = name;
        this.address = address;
        this.phone = phone;
    }
}

