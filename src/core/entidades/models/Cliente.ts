import { IUsuario } from '../interfaces/IUsuario';

export class Cliente implements IUsuario {
    id: number;
    nome: string;
    senha: string;
    dataNascimento: Date;
    cpf: string;
    telefone: string;
    endereco: string;
    tipoUsuario: string;
    statusUsuario: string;

    constructor(id: number, nome: string, senha: string, dataNascimento: Date, cpf: string, telefone: string, endereco: string) {
        this.id = id;
        this.nome = nome;
        this.senha = senha;
        this.dataNascimento = dataNascimento;
        this.cpf = cpf;
        this.telefone = telefone;
        this.endereco = endereco;
        this.tipoUsuario = 'cliente';
        this.statusUsuario = 'ativo';
    } 

    consultarDados(): void {
        console.log(`Nome: ${this.nome}, Endereço: ${this.endereco}, Telefone: ${this.telefone}`);
    } 
}
 

 