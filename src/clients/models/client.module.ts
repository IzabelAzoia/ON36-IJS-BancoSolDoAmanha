import { ClientService } from '../services/client.service';
import { ClienteController } from '../controllers/client.controller';
import { Module } from '@nestjs/common';

@Module({
  controllers: [ClienteController],
  providers: [ClientService],
  exports: [ClientService],
})
export class ClientModule {}