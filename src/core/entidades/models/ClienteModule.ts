import { ClienteService } from './../services/ClienteService';
import { ClienteController } from './../../controllers/Cliente.controller';
import { Module } from '@nestjs/common';

@Module({
  controllers: [ClienteController],
  providers: [ClienteService],
  exports: [ClienteService],
})
export class ClienteModule {}