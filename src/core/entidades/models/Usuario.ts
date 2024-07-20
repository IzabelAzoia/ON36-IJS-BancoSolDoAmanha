import { IUsuario } from "../interfaces/IUsuario";

export class Usuario implements IUsuario {
    id: number;
    nome: string;
    senha: string;
    dataNascimento: Date;
    cpf: string;
    telefone: string;
    endereco: string;
    tipoUsuario: string;
    statusUsuario: string;

    constructor(id: number, nome: string, senha: string, dataNascimento: Date, cpf: string, telefone: string, endereco: string, tipoUsuario: string, statusUsuario: string) {
        this.id = id;
        this.nome = nome;
        this.senha = senha;
        this.dataNascimento = dataNascimento;
        this.cpf = cpf;
        this.telefone = telefone;
        this.endereco = endereco;
        this.tipoUsuario = tipoUsuario;
        this.statusUsuario = statusUsuario;
    } 

    consultarDados(): void {
        console.log(`Nome: ${this.nome}, Endereço: ${this.endereco}, Telefone: ${this.telefone}`);
    } 
}