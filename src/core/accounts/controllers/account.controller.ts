import { Controller, Get, Post, Delete, Param, Body, NotFoundException, UseGuards } from '@nestjs/common';
import { AccountService } from '../services/account.service';
import { AccountInterface } from '../interfaces/account.interface';
import { AccountType } from '../enums/account-type.enum';
import { AuthGuard } from '../guards/auth.guard';
import { RolesGuard } from '../guards/roles.guards';
import { Roles } from '../guards/roles.decorator';
import { Manager } from '../models/manager.model';
import { Client } from '../models/client.model';

@Controller('accounts')
export class AccountController {
    constructor(private readonly accountService: AccountService) {}

 

    @Post('create')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles('manager')
    createAccount(
        @Body('manager') manager: Manager,
        @Body('client') client: Client,
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
    removeAccount(@Param('id') id: string, @Body('manager') manager: Manager): void {
        this.accountService.removeAccount(manager, id);
    }
}
