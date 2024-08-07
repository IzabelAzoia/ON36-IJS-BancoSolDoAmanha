import { BadRequestException, Controller, Post, Body, Delete, Param, Patch, Get } from '@nestjs/common';
import { ManagerService } from 'managers/services/manager.service';
import { CreateClientDto } from 'clients/dtos/create-client.dto';
import { UpdateAccountDto } from 'accounts/dtos/update-account.dto';
import { AccountType } from 'accounts/enums/account-type.enum';

function convertToAccountType(accountType: string): AccountType | undefined {
  if (Object.values(AccountType).includes(accountType as AccountType)) {
    return accountType as AccountType;
  }
  return undefined;
}

@Controller('manager')
export class ManagerController {
  constructor(private readonly managerService: ManagerService) {}

  @Post('client/add')
  async addClient(@Body() createClientDto: CreateClientDto) {
    return this.managerService.createClient(createClientDto);
  }

  @Delete('client/remove/:clientId')
  async removeClient(@Param('clientId') clientId: string) {
    return this.managerService.removeClient(clientId);
  }

  @Post('open-account')
  async openAccount(
      @Body('managerId') managerId: string,
      @Body('clientId') clientId: string,
      @Body('accountType') accountType: string,
      @Body('initialBalance') initialBalance: number,
      @Body('extraParam') extraParam?: number
  ) {
    const convertedAccountType = convertToAccountType(accountType);
    if (!convertedAccountType) {
      throw new BadRequestException(`Invalid account type: ${accountType}`);
    }
    return this.managerService.openAccount(managerId, clientId, convertedAccountType, initialBalance, extraParam);
  }

  @Delete('account/close/:accountId')
  async closeAccount(@Param('accountId') accountId: string) {
    return this.managerService.closeAccountForClient(accountId);
  }

  @Patch('account/modify/:accountId')
  async modifyAccount(
    @Param('accountId') accountId: string,
    @Body() updateAccountDto: UpdateAccountDto
  ) {
    const { type, balance } = updateAccountDto;
    const convertedAccountType = convertToAccountType(type);
    if (!convertedAccountType) {
      throw new BadRequestException(`Invalid account type: ${type}`);
    }
    return this.managerService.modifyAccountTypeForClient(accountId, convertedAccountType, balance);
  }

  @Get('clients')
  async getAllClientsAndAccounts() {
    return this.managerService.getAllClientsAndAccounts();
  }

  @Get('accounts')
  async getAllAccounts() {
    return this.managerService.getAllAccounts();
  }
}

