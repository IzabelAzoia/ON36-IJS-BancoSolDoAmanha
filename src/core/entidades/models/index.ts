import { Cliente } from './Cliente.model' 
import { GerenteContas } from './GerenteContas.model';
import { ContaCorrente } from './ContaCorrente';
import { ContaPoupanca } from './ContaPoupanca';
import { CaixaEletronico } from './CaixaEletronico';
 

function criarContaCorrente(gerente: GerenteContas, id: string, cliente: Cliente, saldo: number, limiteChequeEspecial: number): ContaCorrente {
    return gerente.criarContaCorrente(id, cliente, saldo, limiteChequeEspecial);
}


function criarContaPoupanca(gerente: GerenteContas, id: string, cliente: Cliente, saldo: number, taxaJuros: number): ContaPoupanca {
    return gerente.criarContaPoupanca(id, cliente, saldo, taxaJuros);
}


const cliente1: Cliente = new Cliente("1", 'Paula Carvalho', 'senha192', new Date('1995-07-23'), '123.456.789-00', '99999-9999', 'AV Brasil, 88', 'gerente');
const cliente2: Cliente = new Cliente("2", 'Maria Souza', 'senha483', new Date('1993-01-10'), '987.654.321-00', '88888-8888', 'Rua Cidade Leiria, 79', 'gerente');

// O mesmo para o GerenteContas, passando os IDs como strings
const gerente = new GerenteContas("3", 'Jacira Duarte', 'senha781', new Date('1975-02-10'), '111.222.333-44', '77777-7777', 'Rua Nelsom de Souza, 106', 'Ativo');

// Novamente, IDs como strings
const contaCorrente1 = criarContaCorrente(gerente, "1", cliente1, 71000, 2500);
const contaPoupanca1 = criarContaPoupanca(gerente, "2", cliente2, 62000, 0.35);


const caixaEletronico = new CaixaEletronico();


caixaEletronico.depositar(contaCorrente1, 9500);
caixaEletronico.sacar(contaPoupanca1, 900);

console.log('Saldo Conta Corrente após depósito:', contaCorrente1.consultarSaldo());
console.log('Saldo Conta Poupança:', contaPoupanca1.consultarSaldo());


const sucessoTransferencia = caixaEletronico.transferir(contaCorrente1, contaPoupanca1, 5200);
console.log('Transferência realizada com sucesso:', sucessoTransferencia);
console.log('Saldo Conta Corrente após transferência:', contaCorrente1.consultarSaldo());
console.log('Saldo Conta Poupança após recebimento de transferência:', contaPoupanca1.consultarSaldo());


const sucessoSaqueChequeEspecial = contaCorrente1.sacar(1500);
console.log('Saque dentro do limite do cheque especial realizado com sucesso:', sucessoSaqueChequeEspecial);
console.log('Saldo Conta Corrente após saque com cheque especial:', contaCorrente1.consultarSaldo());


contaPoupanca1.aplicarJuros();
console.log('Saldo Conta Poupança após aplicação de juros:', contaPoupanca1.consultarSaldo());