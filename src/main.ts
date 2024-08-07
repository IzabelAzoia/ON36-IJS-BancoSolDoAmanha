import { ClientRepository } from './clients/repositories/client-repository';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AccountFactory } from './factories/account.factory';
import { AccountType } from './accounts/enums/account.enum';
import { ClientService } from './clients/services/client.service';
import { ManagerService } from './managers/services/manager.service';
import { UserStatus } from './user/enums/user.status.enum';
import { Client } from './clients/models/client.model';
import { Manager } from './managers/models/manager.model';
import { AccountService } from './accounts/services/account.service';
import { IdGeneratorService } from './shared/utils/id-generator.service';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // Criar instâncias de serviços e dependências
    const idGeneratorService = new IdGeneratorService();
    const clientService = new ClientService(clientRepository );
    const accountFactory = new AccountFactory(clientService, managerService); // Observe que managerService ainda não foi definido aqui
    const accountService = new AccountService(accountFactory, idGeneratorService);

    // Criar o managerService depois das dependências que ele precisa
    const managerService = new ManagerService(clientService, accountService, accountFactory);

    const client = new Client(
        'clientId',
        'Client Name',
        'password',
        'email@example.com',
        'cpf',
        'phone',
        'address',
        UserStatus.Active
    );

    const manager = new Manager(
        'managerId',
        'Manager Name',
        'password',
        'birthDate',
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

    const foundManager = managerService.findManagerById('managerId');
    console.log(foundManager);

    await app.listen(3000);
}