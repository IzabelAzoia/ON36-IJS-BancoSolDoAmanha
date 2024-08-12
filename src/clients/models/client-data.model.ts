import { UserType } from '../../users/enums/user-types.enum';
import { UserStatus } from '../../users/enums/user.status.enum';
import { AccountInterface } from '../../accounts/interfaces/account.interface';

export class ClientData {
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

