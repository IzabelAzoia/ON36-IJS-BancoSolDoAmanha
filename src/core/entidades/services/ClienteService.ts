import { Injectable, NotFoundException } from '@nestjs/common';
import { Cliente } from '../models/Cliente.model';
import { CreateClienteDto } from '../../dtos/create-cliente.dto';
import { UpdateClienteDto } from '../../dtos/update-cliente.dto';
import { AssociarContaDto } from '../../dtos/associar-conta.dto';
import { Conta } from '../models/Conta.model';

@Injectable()
export class ClienteService {
  private clientes: Cliente[] = [];

  async adicionar(createClienteDto: CreateClienteDto): Promise<Cliente> {
    const cliente = new Cliente(
      createClienteDto.id,
      createClienteDto.nome,
      createClienteDto.senha,
      createClienteDto.dataNascimento,
      createClienteDto.cpf,
      createClienteDto.telefone,
      createClienteDto.endereco,
      createClienteDto.gerente
    );
    this.clientes.push(cliente);
    return cliente;
  }

  async buscarPorId(id: string): Promise<Cliente> {
    const cliente = this.clientes.find(cliente => cliente.id === id);
    if (!cliente) {
      throw new NotFoundException(`Cliente com ID ${id} não encontrado.`);
    }
    return cliente;
  }

  async buscarTodos(): Promise<Cliente[]> {
    return this.clientes;
  }

  async atualizar(id: string, updateClienteDto: UpdateClienteDto): Promise<Cliente> {
    const cliente = await this.buscarPorId(id);
    if (cliente) {
      cliente.nome = updateClienteDto.nome || cliente.nome;
      cliente.senha = updateClienteDto.senha || cliente.senha;
      cliente.dataNascimento = updateClienteDto.dataNascimento || cliente.dataNascimento;
      cliente.cpf = updateClienteDto.cpf || cliente.cpf;
      cliente.telefone = updateClienteDto.telefone || cliente.telefone;
      cliente.endereco = updateClienteDto.endereco || cliente.endereco;
      cliente.gerente = updateClienteDto.gerente || cliente.gerente;
      return cliente;
    }
    throw new NotFoundException(`Cliente com ID ${id} não encontrado.`);
  }

  async verificarCredito(id: string): Promise<{ credito: number }> {
    const cliente = await this.buscarPorId(id);
    if (cliente) {
      return { credito: 1000 };
    }
    throw new NotFoundException(`Cliente com ID ${id} não encontrado.`);
  }

  async associarConta(associarContaDto: AssociarContaDto): Promise<Cliente> {
    const cliente = await this.buscarPorId(associarContaDto.clienteId);
    if (!cliente) {
      throw new NotFoundException(`Cliente com ID ${associarContaDto.clienteId} não encontrado.`);
    }

    const conta = new Conta(
      associarContaDto.contaId,
      associarContaDto.tipo,
      cliente,
      associarContaDto.saldo
    );

    cliente.abrirConta(conta);

    return cliente;
  }
}
