import { Controller, Get, Post, Delete, Param, Body, NotFoundException, UseGuards } from '@nestjs/common';
import { AccountService } from '../../domain/accounts/services/account.service';
import { AccountInterface } from '../../domain/accounts/account.interface';
import { AccountType } from '../../domain/accounts/account-type.enum';
import { AuthGuard } from '../../infrastructure/shared/guards/auth.guard';
import { RolesGuard } from '../../infrastructure/shared/guards/roles.guards';
import { Roles } from '../../infrastructure/shared/guards/roles.decorator';
import { ManagerEntity } from '../../domain/managers/entities/manager.entity';
import { ClientEntity } from 'src/domain/clients/entities/client.entity';

@Controller('accounts')
export class AccountController {
    constructor(private readonly accountService: AccountService) {}

 

    @Post('create')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles('manager')
    async createAccount(
        @Body('manager') manager: ManagerEntity,
        @Body('client') client: ClientEntity,
        @Body('balance') balance: number,
        @Body('type') type: AccountType,
        @Body('extraParam') extraParam: number
    ): Promise<AccountInterface> {
        return await this.accountService.openAccount(manager, type, client, balance, extraParam);
    }

    @Get(':id')
    findById(@Param('id') id: string): AccountInterface {
        return this.accountService.findById(id);
    }

    @Get()
    findAll(): AccountInterface[] {
        return this.accountService.findAll();
    }

    @Delete(':id')
    removeAccount(@Param('id') id: string, @Body('manager') manager: ManagerEntity): void {
        this.accountService.removeAccount(manager, id);
    }
}
