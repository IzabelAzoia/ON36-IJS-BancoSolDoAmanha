import { Injectable } from '@nestjs/common';
import { Client } from '../../clients/models/client.model';
import { Manager } from '../../managers/models/manager.model';
import { UserInterface } from '../../models/interfaces/user.interface';
import { UserType } from '../enums/user-types.enum';
import { UserStatus } from '../enums/user.status.enum';
import { AccountFactory } from '../../factories/account.factory';

@Injectable()
export class UserFactory {
    constructor(private accountFactory: AccountFactory) {}
    createUser(
        userType: UserType,
        id: string,
        name: string,
        password: string,
        birthDate: string,
        cpf: string,
        phone: string,
        address: string,
        userStatus: UserStatus,
        managerId?: string
    ): UserInterface {
        switch (userType) {
            case UserType.Client:
                return new Client(id, name, password, birthDate, cpf, phone, address, userStatus);
            case UserType.Manager:
                return new Manager(id, 'ManagerRole', name, password, birthDate, cpf, phone, address, userStatus, this.accountFactory);
            default:
                throw new Error('Invalid user type');
        }
    }
}
