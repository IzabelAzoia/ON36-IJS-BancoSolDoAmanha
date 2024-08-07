import { AccountInterface } from 'accounts/interfaces/account.interface';

export class Transaction {
    id: string;
    sourceAccount: AccountInterface;
    destinationAccount: AccountInterface | null;
    amount: number;
    date: Date;

    constructor(id: string, sourceAccount: AccountInterface, amount: number, destinationAccount: AccountInterface | null = null) {
        this.id = id;
        this.sourceAccount = sourceAccount;
        this.destinationAccount = destinationAccount;
        this.amount = amount;
        this.date = new Date();
    }

    register(): void {
        console.log(`Transaction registered: ${this.date.toLocaleString()} - ${this.description()}`);
    }

    description(): string {
        if (this.destinationAccount) {
            return `Transfer of ${this.amount} from ${this.sourceAccount.client.name} to ${this.destinationAccount.client.name}`;
        } else {
            return `Withdrawal of ${this.amount} from the account of ${this.sourceAccount.client.name}`;
        }
    }

    getId(): string {
        return this.id;
    }

    getDate(): Date {
        return this.date;
    }
}

