import { AccountInterface } from "./account.interface";
import { Statement } from '../../infrastructure/shared/interfaces/statement.interface';

export interface AccountOperationsInterface {
    accounts: AccountInterface[];
    getStatement: () => Statement;
    checkBalance: () => number;
}
