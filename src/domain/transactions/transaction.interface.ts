export interface TransactionInterface {
  register(): void;
  getDescription(): string;
  getId(): string;
  getDate(): Date;
}