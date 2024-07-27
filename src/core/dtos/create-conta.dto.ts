import { Cliente } from '../entidades/models/Cliente.model';

export class CreateContaDto {
    id: string;
    tipo: string;
    cliente: Cliente;
    saldo: number;
  }
