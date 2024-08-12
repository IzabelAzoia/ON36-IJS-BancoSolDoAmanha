export interface TransactionInterface {
    register(): void;
    description(): string;
    getId(): string;
    getDate(): Date;
  }