import { ManagerService } from '../../managers/services/manager.service';
import { ManagerModel } from '../../managers/models/manager.model';
import { ClientData } from './client-data.model';
import { Statement } from '../../shared/interfaces/statement.interface';

export class ClientDataManager {
    private clientData: ClientData;

    constructor(clientData: ClientData) {
        this.clientData = clientData;
    }

    getStatement(): Statement {
        return {
            generateStatement: () => {
                return ['Statement line 1', 'Statement line 2'];
            },
        };
    }

    checkBalance(): number {
        return 100;
    }

    getUserData(): string {
        return `Name: ${this.clientData.name}, Address: ${this.clientData.address}, Phone: ${this.clientData.phone}, CPF: ${this.clientData.cpf}`;
    }

    async findManagerById(managerService: ManagerService): Promise<ManagerModel | undefined> {
        return managerService.findManagerById(this.clientData.managerId);
    }
}
