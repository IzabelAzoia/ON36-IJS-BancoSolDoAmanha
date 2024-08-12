import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AccountFactory } from './accounts/factories/account.factory';
import { AccountType } from './accounts/enums/account.enum';
import { ClientService } from './clients/services/client.service';
import { ManagerService } from './managers/services/manager.service';
import { UserStatus } from './users/enums/user.status.enum';
import { ClientData } from './clients/models/client-data.model';
import { ManagerModel } from './managers/models/manager.model';
import { AccountService } from './accounts/services/account.service';
import { IdGeneratorService } from './shared/utils/id-generator.service';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const idGeneratorService = new IdGeneratorService();
    const clientService = new ClientService();  // Atualize conforme sua implementação
    const accountFactory = new AccountFactory(clientService);
    const accountService = new AccountService(accountFactory, idGeneratorService);
    const managerService = new ManagerService(clientService, accountService, accountFactory);

    const client = new ClientData(
        'clientId',
        'Client Name',
        'password',
        'email@example.com',
        'cpf',
        'phone',
        'address',
        UserStatus.Active
    );

    const manager = new ManagerModel(
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

    console.log(savingsAccount.generateStatement());
    console.log(checkingAccount.generateStatement());

    const foundManager = await managerService.findManagerById('managerId');
    console.log(foundManager);

    await app.listen(3000);
}

bootstrap();