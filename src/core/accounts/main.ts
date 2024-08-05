import { NestFactory } from '@nestjs/core';
import { AppModule } from './../../app.module';
import { AccountFactory } from './factories/account.factory';
import { AccountType } from './enums/account.enum';
import { CheckingAccount } from './models/checking-account.model';
import { SavingsAccount } from './models/savings-account.model';
import { ClientService } from './services/client.service';
import { ManagerService } from './services/manager.service';
import { UserStatus } from '../accounts/enums/user.status.enum';
import { Client } from './models/client.model';
import { Manager } from '../accounts/models/manager.model';


async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // Criar instâncias dos serviços necessários
    const clientService = new ClientService();
    const managerService = new ManagerService();

    // Criar uma instância da fábrica de contas
    const factory = new AccountFactory(clientService, managerService);

    // Criar um cliente com dados de exemplo
    const client = new Client(
        'clientId',
        'Client Name',
        'password',
        'email@example.com', // Adicione o e-mail
        'cpf',
        'phone',
        'address',
        UserStatus.Active
    );

    // Criar um gerente com dados de exemplo
    const manager = new Manager(
        'managerId',
        'Manager Name',
        'password',
        'birthDate',
        'cpf',
        'phone',
        'address',
        UserStatus.Active,
        factory
    );
    await managerService.addManager(manager);

    // Criar uma conta poupança
    const savingsAccount = factory.createAccount(
        'managerId',
        AccountType.Savings, // Use o enum AccountType
        client,
        1000,
        5.0 // Taxa de juros
    );

    // Criar uma conta corrente
    const checkingAccount = factory.createAccount(
        'managerId',
        AccountType.Checking, // Use o enum AccountType
        client,
        2000,
        1000 // Limite de cheque especial
    );

    // Usar as contas para gerar extratos
    console.log(savingsAccount.generateStatement());
    console.log(checkingAccount.generateStatement());

    // Encontrar um gerente pelo ID e exibir
    const foundManager = managerService.findManagerById('managerId');
    console.log(foundManager);

    await app.listen(3000);
}

bootstrap();