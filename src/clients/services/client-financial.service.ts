import { IClientRepositoryInterface } from "../interfaces/i-cliente-repositoy.interface";
import { Injectable, NotFoundException } from '@nestjs/common';


@Injectable()
export class ClientFinancialService {
    constructor(private readonly clientRepository: IClientRepositoryInterface) {}

    async getBalance(id: string): Promise<number> {
        const client = await this.clientRepository.findById(id);
        if (!client) {
            throw new NotFoundException(`Client with ID ${id} not found`);
        }
        return client.checkBalance();
    }


}
