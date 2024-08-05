export class CreateTransactionDto {
    constructor(
        public readonly amount: number,
        public readonly description: string
    ) {}
}