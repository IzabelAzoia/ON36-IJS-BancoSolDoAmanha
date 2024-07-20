import { Cliente } from './entidades/models/Cliente'
import { IUsuario } from './entidades/interfaces/IUsuario'; 
import { GerenteContas } from './entidades/models/GerenteContas';
import { ContaCorrente } from './entidades/ContaCorrente';
import { ContaPoupanca } from './entidades/ContaPoupanca';
import { CaixaEletronico } from './entidades/CaixaEletronico';
 

function criarContaCorrente(gerente: GerenteContas, id: number, cliente: IUsuario, saldo: number, limiteChequeEspecial: number): ContaCorrente {
    return gerente.criarContaCorrente(id, cliente, saldo, limiteChequeEspecial);
}


function criarContaPoupanca(gerente: GerenteContas, id: number, cliente: IUsuario, saldo: number, taxaJuros: number): ContaPoupanca {
    return gerente.criarContaPoupanca(id, cliente, saldo, taxaJuros);
}


const cliente1: IUsuario = new Cliente(1, 'Paula Carvalho', 'senha192', new Date('1995-07-23'), '123.456.789-00', '99999-9999', 'AV Brasil, 88');
const cliente2: IUsuario = new Cliente(2, 'Maria Souza', 'senha483', new Date('1993-01-10'), '987.654.321-00', '88888-8888', 'Rua Cidade Leiria, 79');


const gerente = new GerenteContas(3, 'Jacira Duarte', 'senha781', new Date('1975-02-10'), '111.222.333-44', '77777-7777', 'Rua Nelsom de Souza, 106', 'Ativo');


const contaCorrente1 = criarContaCorrente(gerente, 1, cliente1, 71000, 2500);
const contaPoupanca1 = criarContaPoupanca(gerente, 2, cliente2, 62000, 0.35);


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