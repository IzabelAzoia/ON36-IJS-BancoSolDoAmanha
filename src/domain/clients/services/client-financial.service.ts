import { Injectable, NotFoundException } from '@nestjs/common';
import { ClientRepositoryInterface } from 'src/outbound/clients/cliente-repositoy.interface';


@Injectable()
export class ClientFinancialService {
    constructor(private readonly clientRepository: ClientRepositoryInterface) {}

    async getBalance(id: string): Promise<number> {
        const client = await this.clientRepository.findById(id);
        if (!client) {
            throw new NotFoundException(`Client with ID ${id} not found`);
        }
        return client.checkBalance();
    }


}
