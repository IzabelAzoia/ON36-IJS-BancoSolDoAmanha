import { IsString, IsNumber } from 'class-validator';

export class WithdrawDto {
  @IsString()
  readonly accountId: string;

  @IsNumber()
  readonly amount: number;
}
