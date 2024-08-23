import { IsString, IsNumber } from 'class-validator';

export class DepositDto {
  @IsString()
  readonly accountId: string;

  @IsNumber()
  readonly amount: number;
}
