import { UpdateContaDto } from './../dtos/update-conta.dto'; 
import { ContaService } from './../entidades/services/ContaService';
import { Controller, Get, Post, Param, Body, Patch, Delete } from '@nestjs/common';
import { CreateContaDto } from '../dtos/create-conta.dto';

@Controller('conta')
export class ContaController {
  constructor(private readonly contaService: ContaService) {}

  @Post()
  async criarConta(@Body() createContaDto: CreateContaDto) {
    return this.contaService.create(createContaDto);
  }

  @Get(':id')
  async buscarContaPorId(@Param('id') id: string) {
    return this.contaService.findById(id);
  }

  @Get()
  async buscarTodasContas() {
    return this.contaService.findAll();
  }

  @Patch(':id')
  async atualizarConta(@Param('id') id: string, @Body() updateContaDto: UpdateContaDto) {
    return this.contaService.update(id, updateContaDto);
  }

  @Delete(':id')
  async removerConta(@Param('id') id: string) {
    return this.contaService.delete(id);
  }

  @Delete('cliente/:idCliente')
  async removerContaPorCliente(@Param('idCliente') idCliente: string) {
    return this.contaService.deleteByClienteId(idCliente);
  }
}
