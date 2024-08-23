import { IsString, IsNumber } from 'class-validator';

export class TransferDto {
  @IsString()
  readonly fromAccountId: string;

  @IsString()
  readonly toAccountId: string;

  @IsNumber()
  readonly amount: number;
}
