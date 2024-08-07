import { AccountInterface } from '../../SEmnome/interfaces/account.interface';
import { Transaction } from './transaction.model';

export class ATM {
    private transactions: Transaction[] = [];

    /**
     * Deposits an amount into the specified account.
     * @param account - The account where the amount will be deposited.
     * @param amount - The amount to be deposited.
     */
    public deposit(account: AccountInterface, amount: number): void {
        account.deposit(amount);
        this.transactions.push(new Transaction((this.transactions.length + 1).toString(), account, amount, null, 'deposit'));
    }

    /**
     * Withdraws an amount from the specified account.
     * @param account - The account from which the amount will be withdrawn.
     * @param amount - The amount to be withdrawn.
     * @returns `true` if the withdrawal was successful, otherwise `false`.
     */
    public withdraw(account: AccountInterface, amount: number): boolean {
        const success = account.withdraw(amount);
        if (success) {
            this.transactions.push(new Transaction((this.transactions.length + 1).toString(), account, amount, null, 'withdrawal'));
        }
        return success;
    }

    /**
     * Transfers an amount between two accounts.
     * @param sourceAccount - The account from which the amount will be transferred.
     * @param destinationAccount - The account to which the amount will be transferred.
     * @param amount - The amount to be transferred.
     * @returns `true` if the transfer was successful, otherwise `false`.
     */
    public transfer(sourceAccount: AccountInterface, destinationAccount: AccountInterface, amount: number): boolean {
        if (sourceAccount.transfer(destinationAccount, amount)) {
            this.transactions.push(new Transaction((this.transactions.length + 1).toString(), sourceAccount, amount, destinationAccount, 'transfer'));
            return true;
        }
        return false;
    }

    /**
     * Displays the details of the account.
     * @param account - The account whose details will be displayed.
     */
    public displayDetails(account: Account): void {
        console.log(`Account ID: ${account.id}`);
        console.log(`Balance: ${account.getBalance()}`);
        // Additional account details can be added here
    }
}

