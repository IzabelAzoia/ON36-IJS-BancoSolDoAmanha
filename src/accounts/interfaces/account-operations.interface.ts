import { AccountInterface } from '../../accounts/interfaces/account.interface';
import { Statement } from '../../shared/interfaces/statement.interface';

export interface AccountOperationsInterface {
    accounts: AccountInterface[];
    getStatement: () => Statement;
    checkBalance: () => number;
}
