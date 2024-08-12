import { Injectable } from '@nestjs/common';
import { ClientData } from '../../clients/models/client-data.model';
import { ManagerModel } from '../../managers/models/manager.model';
import { UserInterface } from '../interfaces/user.interface';
import { UserType } from '../enums/user-types.enum';
import { UserStatus } from '../enums/user.status.enum';
import { AccountFactory } from '../../accounts/factories/account.factory';
import { AccountManagementService } from 'src/accounts/services/account-management.service';
import { ClientManagementService } from 'src/clients/services/client-management.service';

@Injectable()
export class UserFactory {
    constructor(
        private accountFactory: AccountFactory,
        private clientService: ClientManagementService,
        private accountService: AccountManagementService
    ) {}

    createUser(
        userType: UserType,
        id: string,
        role: string,
        name: string,
        password: string,
        birthDate: string,
        cpf: string,
        phone: string,
        address: string,
        userStatus: UserStatus,
        email: string,
        managerId?: string
    ): UserInterface {
        switch (userType) {
            case UserType.Client:
                return new ClientData(id, name, password, birthDate, cpf, phone, address, userStatus);
            case UserType.Manager:
                return new ManagerModel(
                    id,
                    role,
                    name,
                    password,
                    birthDate,
                    cpf,
                    phone,
                    address,
                    userStatus,
                    email,
                    this.clientService,
                    this.accountService
                );
            default:
                throw new Error('Invalid user type');
        }
    }
}
