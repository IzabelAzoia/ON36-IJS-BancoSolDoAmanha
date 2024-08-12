export class SocialCurrency {
    private name: string;
    private correspondingRealValue: number;
    private inCirculation: number;

    constructor(name: string, correspondingRealValue: number) {
        this.name = name;
        this.correspondingRealValue = correspondingRealValue;
        this.inCirculation = 0;
    }

    issue(quantity: number): void {
        this.inCirculation += quantity;
        console.log(`${quantity} units of ${this.name} issued.`);
    }

    convertToReais(quantity: number): number {
        return quantity * this.correspondingRealValue;
    }

    details(): string {
        return `Social Currency: ${this.name}, Value in Reais: ${this.correspondingRealValue}, In Circulation: ${this.inCirculation}`;
    }
}
