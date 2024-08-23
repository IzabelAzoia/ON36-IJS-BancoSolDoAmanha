import { UserType } from '../../users/user-types.enum';
import { UserStatus } from '../../users/user.status.enum';
import { AccountInterface } from '../../accounts/account.interface';

export class ClientEntity {
    userType: UserType = UserType.Client;
    accounts: AccountInterface[] = [];

    constructor(
        public id: string,
        public name: string,
        public email: string,
        public password: string,
        public birthDate: string,
        public cpf: string,
        public phone: string,
        public address: string,
        public managerId?: string,
        public userStatus?: UserStatus
    ) {}
    checkBalance(): number {
        return this.accounts.reduce((total, account) => total + account.balance, 0);
    }


}

