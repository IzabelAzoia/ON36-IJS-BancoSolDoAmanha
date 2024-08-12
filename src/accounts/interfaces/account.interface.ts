import { ClientData } from "src/clients/models/client-data.model";

export interface AccountInterface {
    
    id: string;
    client: ClientData;
    balance: number;
    deposit(amount: number): void;
    withdraw(amount: number): boolean;
    checkBalance(): number;
    transfer(destinationAccount: AccountInterface, amount: number): boolean;
    receiveTransfer(amount: number): void;
    generateStatement(): string;
    getAccountId(): string;
}
