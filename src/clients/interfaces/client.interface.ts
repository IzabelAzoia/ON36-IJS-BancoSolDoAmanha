import { UserType } from '../../user/enums/user-types.enum';
import { AccountInterface } from '../../accounts/interfaces/account.interface';
import { Statement } from '../../shared/interfaces/statement.interface';

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
  