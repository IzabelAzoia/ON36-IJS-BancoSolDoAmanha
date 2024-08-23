import { Injectable } from '@nestjs/common';
import { ManagerEntity } from '../managers/entities/manager.entity';
import { UserInterface } from './user.interface';
import { UserType } from '../../domain/users/user-types.enum';
import { UserStatus } from '../../domain/users/user.status.enum';
import { AccountFactory } from '../../domain/accounts/account.factory';
import { AccountManagementServiceInterface } from '../../domain/accounts/account-management-service.interface';
import { ClientManagementService } from '../clients/services/client-management.service';
import { ClientEntity } from '../clients/entities/client.entity';
import { AccountManagementService } from '../accounts/services/account-management.service';

@Injectable()
export class UserFactory {
    constructor(
        private accountFactory: AccountFactory,
        private clientService: ClientManagementService,
        private accountService: AccountManagementServiceInterface
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
                return new ClientEntity(id, name, password, birthDate, cpf, phone, address, userStatus);
            case UserType.Manager:
                return new ManagerEntity(
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
                    this.accountService as unknown as AccountManagementService
                );
            default:
                throw new Error('Invalid user type');
        }
    }
}
