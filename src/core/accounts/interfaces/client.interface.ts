import { UserType } from '../enums/user-types.enum';
import { AccountInterface } from '../interfaces/account.interface';
import { Statement } from './statement.interface';

export interface ClientInterface {
    id: string;
    name: string;
    password: string;
    birthDate: string;
    cpf: string;
    address: string;
    email: string;
    userType: UserType;
    accounts: AccountInterface[];
    getStatement: () => Statement;
    checkBalance: () => number;
  }
  