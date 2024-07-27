import { CreateClienteDto } from '../../dtos/create-cliente.dto';
import { Cliente } from '../models/Cliente.model';
import { Conta } from '../models/Conta.model';
import { GerenteContas } from '../models/GerenteContas.model';
import { IdGeneratorService } from './IdGeneratorService';
import { AbrirContaDto } from 'src/core/dtos/abrir-conta.dto';

export class GerenteContaService {
  private readonly gerentes: GerenteContas[] = [];
  private readonly clientes: Cliente[] = [];
  private readonly idGenerator = new IdGeneratorService(); 

  criarCliente(createClienteDto: CreateClienteDto): Cliente {
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

    const gerente = this.getGerente(createClienteDto.gerente);
    if (gerente) {
      gerente.adicionarCliente(cliente);
    } else {
      throw new Error('Gerente não encontrado!');
    }
  
    this.clientes.push(cliente); 
    return cliente;
  }

  removerCliente(clienteId: string): string {
    const clienteIndex = this.clientes.findIndex(c => c.id === clienteId);
    if (clienteIndex > -1) {
      const cliente = this.clientes[clienteIndex];
      const gerente = this.getGerente(cliente.gerente);
      if (gerente) {
        gerente.removerCliente(clienteId);
        this.clientes.splice(clienteIndex, 1);
        return 'Cliente removido!';
      } else {
        return 'Gerente não encontrado!';
      }
    }
    return 'Cliente não encontrado!';
  }

  abrirContaParaCliente(clienteId: string, abrirContaDto: AbrirContaDto): string {
    const cliente = this.getCliente(clienteId);
    if (cliente) {
      const idConta = this.idGenerator.gerarId();
      const conta = new Conta(
        idConta,
        abrirContaDto.tipo,
        cliente,
        abrirContaDto.saldo
      );
      cliente.abrirConta(conta);
      return 'Conta aberta!';
    }
    return 'Cliente não encontrado!';
  }

  fecharContaParaCliente(contaId: string): string  {
    const cliente = this.clientes.find(c => c.contas.some(conta => conta.id === contaId));
    if (cliente) {
      cliente.fecharConta(contaId);
      return 'Conta fechada!';
    }
    return 'Conta não encontrada!';
  }

  modificarTipoDeContaParaCliente(contaId: string, tipo: string, saldo: number): string  {
    const cliente = this.clientes.find(c => c.contas.some(conta => conta.id === contaId));
    if (cliente) {
      const novaConta = new Conta(
        contaId,
        tipo,
        cliente,
        saldo
      );
      cliente.modificarTipoDeConta(contaId, novaConta);
      return 'Tipo de conta modificado!';
    }
    return 'Conta não encontrada!';
  }

  buscarTodosClientesEContas(): any[] {
    return this.clientes.map(cliente => ({
      cliente,
      contas: cliente.contas
    }));
  }

  buscarTodasContas(): Conta[] {
    return this.clientes.flatMap(cliente => cliente.contas);
  }

  private getGerente(id: string): GerenteContas | undefined {
    return this.gerentes.find(gerente => gerente.id === id);
  }

  private getCliente(id: string): Cliente | undefined {
    return this.clientes.find(cliente => cliente.id === id);
  }

  private getGerenteByClienteId(clienteId: string): GerenteContas | undefined {
    const cliente = this.getCliente(clienteId);
    if (!cliente) {
      throw new Error('Cliente não encontrado!');
    }
    return this.getGerente(cliente.gerente);
  }
}

