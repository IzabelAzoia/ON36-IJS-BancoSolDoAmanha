import { UserType } from "../../domain/users/user-types.enum";
import { UserStatus } from "../../domain/users/user.status.enum";

export interface CreateUserDto {
    userType: UserType;
    id: string;
    name: string;
    password: string;
    birthDate: string;
    cpf: string;
    phone: string;
    address: string;
    userStatus: UserStatus;
    email: string;
    managerId?: string;
}
