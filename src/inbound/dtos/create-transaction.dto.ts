export class CreateTransactionDto {
    constructor(
      public readonly accountId: string,
      public readonly amount: number,
      public readonly description: string,
      public readonly type: 'deposit' | 'withdraw' | 'transfer',
      public readonly date: Date = new Date(),
      public readonly toAccountId?: string
    ) {}
}