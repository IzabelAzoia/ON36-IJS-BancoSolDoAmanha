import { PartialType } from '@nestjs/mapped-types';
import { CreateClientDto } from '../dtos/create-client.dto';

export class UpdateClientDto extends PartialType(CreateClientDto) {}

