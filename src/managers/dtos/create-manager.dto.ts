export class CreateManagerDto {
   constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly password: string,
    public readonly birthDate: string,
    public readonly cpf: string,
    public readonly address: string,
    public readonly phone: string,
    public readonly email: string
   ) {}
}