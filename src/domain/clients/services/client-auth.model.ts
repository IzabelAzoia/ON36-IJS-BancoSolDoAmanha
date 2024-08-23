export class ClientAuth {
    private password: string;

    constructor(password: string) {
        this.password = password;
    }

    authenticateUser(password: string): boolean {
        return this.password === password;
    }

    updatePassword(newPassword: string): void {
        this.password = newPassword;
    }
}