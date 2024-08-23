import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AccountFactory } from './domain/accounts/account.factory';
import { AccountType } from './domain/accounts/account.enum';
import { ClientService } from './domain/clients/services/client.service';
import { ManagerService } from './domain/managers/services/manager-admin.service';
import { UserStatus } from './domain/users/user.status.enum';
import { ClientEntity } from './domain/clients/client.entity';
import { ManagerEntity } from './domain/managers/entities/manager.entity';
import { AccountService } from './domain/accounts/services/account.service';
import { IdGeneratorService } from './infrastructure/shared/utils/id-generator.service';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const idGeneratorService = new IdGeneratorService();
    const clientService = new ClientService();  // Atualize conforme sua implementação
    const accountFactory = new AccountFactory(clientService);
    const accountService = new AccountService(accountFactory, idGeneratorService);
    const managerService = new ManagerService(clientService, accountService, accountFactory);

    const client = new ClientEntity(
        'clientId',
        'Client Name',
        'password',
        'email@example.com',
        'cpf',
        'phone',
        'address',
        UserStatus.Active
    );

    const manager = new ManagerEntity(
        'managerId',
        'Manager Name',
        'password',
        new Date('birthDate'),  // Substitua por uma data válida
        'cpf',
        'phone',
        'address',
        UserStatus.Active,
        accountFactory,
        'someOtherParameter'
    );

    await managerService.addManager(manager);

    const savingsAccount = accountFactory.createAccount(
        'managerId',
        AccountType.Savings,
        client,
        1000,
        5.0
    );

    const checkingAccount = accountFactory.createAccount(
        'managerId',
        AccountType.Checking,
        client,
        2000,
        1000
    );

    console.log(await savingsAccount.generateStatement());
    console.log(await checkingAccount.generateStatement());

    const foundManager = await managerService.findManagerById('managerId');
    console.log(foundManager);

    await app.listen(3000);
}

bootstrap();