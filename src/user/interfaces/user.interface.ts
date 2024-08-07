import { UserType } from '../enums/user-types.enum';
import { UserStatus } from '../enums/user.status.enum';


export interface UserInterface {
    id: string;
    name: string;
    password: string;
    birthDate: string;
    cpf: string;
    phone: string;
    address: string;
    userType: UserType;
    userStatus: string; 


    // Methods
    authenticateUser(password: string): boolean;
    updateUser(name: string, address: string, phone: string, password: string): void;
    getUserData(): string;
}