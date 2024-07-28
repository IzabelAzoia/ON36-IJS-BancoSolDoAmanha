import { ClienteModule } from './core/entidades/models/ClienteModule';
import { Module } from '@nestjs/common';

@Module({
  imports: [ClienteModule],
  controllers: [],
  providers: [],
})
export class AppModule {}