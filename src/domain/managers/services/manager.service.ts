// src/services/manager/manager.services.ts
import { Injectable } from '@nestjs/common';
import { AccountManagementServiceInterface } from 'src/domain/accounts/account-management-service.interface';
import { AccountInterface } from 'src/domain/accounts/account.interface';
import { ManagerEntity } from '../entities/manager.entity';

@Injectable()
export class ManagerService implements AccountManagementServiceInterface {
    private accountService: AccountManagementServiceInterface;
    private managers: Map<string, ManagerEntity> = new Map(); // Mapa para armazenar gerentes

    constructor(accountService: AccountManagementServiceInterface) {
        this.accountService = accountService;
    }

    // Implementações dos métodos da interface

    createAccount(accountType: string, clientId: string, initialBalance: number): AccountInterface {
        return this.accountService.createAccount(accountType, clientId, initialBalance);
    }

    closeAccount(accountId: string): void {
        this.accountService.closeAccount(accountId);
    }

    transferFunds(sourceAccountId: string, destinationAccountId: string, amount: number): boolean {
        return this.accountService.transferFunds(sourceAccountId, destinationAccountId, amount);
    }

    modifyAccountTypeForClient(accountId: string, type: string, balance: number): string {
        return this.accountService.modifyAccountTypeForClient(accountId, type, balance);
    }

    getAllAccounts(): AccountInterface[] {
        return this.accountService.getAllAccounts();
    }

    // Novo método para obter um gerente pelo ID
    async getManager(managerId: string): Promise<ManagerEntity | null> {
        return this.managers.get(managerId) || null;
    }

    // Método para adicionar um gerente (opcional)
    addManager(managerId: string, manager: ManagerEntity): void {
        this.managers.set(managerId, manager);
    }
}
