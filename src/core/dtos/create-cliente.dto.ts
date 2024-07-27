export class CreateClienteDto {
    constructor(
        public readonly id: string,
        public readonly nome: string,
        public readonly senha: string,
        public readonly dataNascimento: Date,
        public readonly cpf: string,
        public readonly endereco: string,
        public readonly telefone: string,
        public readonly email: string,
        public readonly gerente: string
    ) {}
}