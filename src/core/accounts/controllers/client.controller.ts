import { AssociarContaDto } from '../dtos/associate-account.dto';
import { UpdateClienteDto } from '../dtos/update-client.dto';
import { CreateClienteDto } from '../dtos/create-client.dto';
import { ClienteService } from '../services/client.service';
import { Controller, Get, Post, Param, Body, Patch, Delete } from '@nestjs/common';

@Controller('cliente')
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}

  @Post('adicionar')
  async adicionarCliente(@Body() createClienteDto: CreateClienteDto) {
    return this.clienteService.adicionar(createClienteDto);
  }

  @Get(':id')
  async buscarCliente(@Param('id') id: string) {
    return this.clienteService.buscarPorId(id);
  }

  @Get()
  async buscarTodosClientes() {
    return this.clienteService.buscarTodos();
  }

  @Patch('atualizar/:id')
  async atualizarCliente(@Param('id') id: string, @Body() updateClienteDto: UpdateClienteDto) {
    return this.clienteService.atualizar(id, updateClienteDto);
  }

  @Post('verificar-credito/:id')
  async verificarCredito(@Param('id') id: string) {
    return this.clienteService.verificarCredito(id);
  }

  @Post('associar-conta')
  async associarConta(@Body() associarContaDto: AssociarContaDto) {
    return this.clienteService.associarConta(associarContaDto);
  }
}
