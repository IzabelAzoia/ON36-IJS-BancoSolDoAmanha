import { Controller, Get, Post, Delete, Param, Body, NotFoundException, UseGuards } from '@nestjs/common';
import { AccountService } from 'accounts/services/account.service';
import { AccountInterface } from 'accounts/interfaces/account.interface';
import { AccountType } from 'accounts/enums/account-type.enum';
import { AuthGuard } from 'shared/guards/auth.guard';
import { RolesGuard } from 'shared/guards/roles.guards';
import { Roles } from 'shared/guards/roles.decorator';
import { ManagerModel } from 'managers/models/manager.model';
import { ClientModel } from 'clients/models/client.model';

@Controller('accounts')
export class AccountController {
    constructor(private readonly accountService: AccountService) {}

 

    @Post('create')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles('manager')
    createAccount(
        @Body('manager') manager: ManagerModel,
        @Body('client') client: ClientModel,
        @Body('balance') balance: number,
        @Body('type') type: AccountType,
        @Body('extraParam') extraParam: number
    ): AccountInterface {
        return this.accountService.openAccount(manager, type, client, balance, extraParam);
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
    removeAccount(@Param('id') id: string, @Body('manager') manager: ManagerModel): void {
        this.accountService.removeAccount(manager, id);
    }
}
