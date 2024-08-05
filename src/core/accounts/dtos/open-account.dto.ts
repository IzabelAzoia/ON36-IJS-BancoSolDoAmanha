import { AccountType } from "core/accounts/enums/account-type.enum";

export class OpenAccountDto {
  readonly type: AccountType; // Ajuste para usar o tipo AccountType
  readonly balance: number;
  readonly extraParam?: number; // Opcional
  readonly managerId: string; // Adicionando a propriedade managerId

}
