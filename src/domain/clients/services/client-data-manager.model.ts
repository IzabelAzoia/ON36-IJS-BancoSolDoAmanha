import { ManagerEntity } from '../../managers/entities/manager.entity';
import { Statement } from '../../../infrastructure/shared/interfaces/statement.interface';
import { ManagerService } from 'src/domain/managers/services/manager.service';
import { ClientEntity } from '../entities/client.entity';

export class ClientDataManager {
    private clientData: ClientEntity;

    constructor(clientData: ClientEntity) {
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

    async findManagerById(managerService: ManagerService): Promise<ManagerEntity | undefined> {
        return managerService.getManager(this.clientData.managerId);
    }
}
