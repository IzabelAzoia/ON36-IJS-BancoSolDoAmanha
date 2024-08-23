import { Module } from '@nestjs/common';
import { ClientService } from 'src/domain/clients/services/client.service';

@Module({
  providers: [ClientService],
  exports: [ClientService],
})
export class ClientModule {}