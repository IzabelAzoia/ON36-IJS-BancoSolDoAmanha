import { UserType } from '../../users/enums/user-types.enum';

export interface ClientDetailsInterface {
    id: string;
    name: string;
    password: string;
    birthDate: string;
    cpf: string;
    address: string;
    email: string;
    userType: UserType;
}
