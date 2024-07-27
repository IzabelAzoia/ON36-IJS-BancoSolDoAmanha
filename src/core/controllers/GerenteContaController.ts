import { GerenteContaService } from './../entidades/services/GerenteContaService';
import { Controller, Post, Body, Delete, Param, Patch, Get } from '@nestjs/common'; 
import { CreateClienteDto } from '../dtos/create-cliente.dto'; // Atualize o caminho se necessário
import { AbrirContaDto } from '../dtos/abrir-conta.dto'; // Atualize o caminho se necessário
import { UpdateContaDto } from '../dtos/update-conta.dto'; // Atualize o caminho se necessário

@Controller('gerente')
export class GerenteController {
  constructor(private readonly gerenteContaService: GerenteContaService) {}

  @Post('cliente/adicionar')
  async adicionarCliente(@Body() createClienteDto: CreateClienteDto) {
    return this.gerenteContaService.criarCliente(createClienteDto);
  }

  @Delete('cliente/remover/:clienteId')
  async removerCliente(@Param('clienteId') clienteId: string) {
    return this.gerenteContaService.removerCliente(clienteId);
  }

  @Post('conta/abrir')
  async abrirConta(@Body() abrirContaDto: AbrirContaDto) {
    return this.gerenteContaService.abrirContaParaCliente(
      abrirContaDto.clienteId,
      abrirContaDto
    );
  }

  @Delete('conta/fechar/:contaId')
  async fecharConta(@Param('contaId') contaId: string) {
    return this.gerenteContaService.fecharContaParaCliente(contaId);
  }

  @Patch('conta/modificar/:contaId')
  async modificarConta(
    @Param('contaId') contaId: string,
    @Body() updateContaDto: UpdateContaDto
  ) {
    const tipo = updateContaDto.tipo;
    const saldo = updateContaDto.saldo;
  
    return this.gerenteContaService.modificarTipoDeContaParaCliente(contaId, tipo, saldo);
  }

  @Get('clientes')
  async buscarTodosClientesEContas() {
    return this.gerenteContaService.buscarTodosClientesEContas();
  }

  @Get('contas')
  async buscarTodasContas() {
    return this.gerenteContaService.buscarTodasContas();
  }
}
