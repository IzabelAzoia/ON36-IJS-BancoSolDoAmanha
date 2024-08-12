import { ClientService } from '../services/client.service';
import { Module } from '@nestjs/common';

@Module({
  providers: [ClientService],
  exports: [ClientService],
})
export class ClientModule {}