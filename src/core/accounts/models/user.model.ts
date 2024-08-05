import { UserInterface } from "../interfaces/user.interface";
import { UserType } from '../enums/user-types.enum';
import { UserStatus } from '../enums/user.status.enum';

export class User implements UserInterface {
    public id: string;
    public name: string;
    public password: string;
    public birthDate: string;
    public cpf: string;
    public phone: string;
    public address: string;
    public userType: UserType;
    public userStatus: UserStatus;

    constructor(
        id: string,
        name: string,
        password: string,
        birthDate: string,
        cpf: string,
        phone: string,
        address: string,
        userType: UserType,
        userStatus: UserStatus
    ) {
        this.id = id;
        this.name = name;
        this.password = password;
        this.birthDate = birthDate;
        this.cpf = cpf;
        this.phone = phone;
        this.address = address;
        this.userType = userType;
        this.userStatus = userStatus;
    }

    // Method for user authentication
    authenticateUser(password: string): boolean {
        return this.password === password;
    }

    // Method to update user details
    updateUser(name: string, address: string, phone: string, password: string): void {
        this.name = name;
        this.address = address;
        this.phone = phone;
        this.password = password;
    }

    // Method to display user details
    getUserData(): string {
        return `Name: ${this.name}, Address: ${this.address}, Phone: ${this.phone}, CPF: ${this.cpf}`;
    }
}