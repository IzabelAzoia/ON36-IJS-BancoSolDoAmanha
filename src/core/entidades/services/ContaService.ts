import { Injectable, NotFoundException } from '@nestjs/common';
import { Conta } from '../models/Conta.model';
import { CreateContaDto } from '../../dtos/create-conta.dto';
import { UpdateContaDto } from '../../dtos/update-conta.dto';

@Injectable()
export class ContaService {
  private contas: Conta[] = [];

  create(createContaDto: CreateContaDto): Conta {
    const conta = new Conta(createContaDto.id, createContaDto.tipo, createContaDto.cliente, createContaDto.saldo);
    this.contas.push(conta);
    return conta;
  }

  findById(id: string): Conta {
    const conta = this.contas.find(c => c.id === id);
    if (!conta) {
      throw new NotFoundException('Conta não encontrada');
    }
    return conta;
  }

  findAll(): Conta[] {
    return this.contas;
  }

  update(id: string, updateContaDto: UpdateContaDto): Conta {
    const conta = this.findById(id);
    if (!conta) {
      throw new NotFoundException('Conta não encontrada');
    }
    conta.tipo = updateContaDto.tipo;
    conta.saldo = updateContaDto.saldo;
    return conta;
  }

  delete(id: string): void {
    const contaIndex = this.contas.findIndex(c => c.id === id);
    if (contaIndex === -1) {
      throw new NotFoundException('Conta não encontrada');
    }
    this.contas.splice(contaIndex, 1);
  }

  deleteByClienteId(idCliente: string): void {
    this.contas = this.contas.filter(c => c.cliente.id !== idCliente);
  }
}
