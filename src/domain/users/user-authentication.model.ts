import { UserAuthenticationInterface } from './user-authentication.interface';

export class UserAuthentication implements UserAuthenticationInterface {
    private password: string;

    constructor(password: string) {
        this.password = password;
    }

    authenticate(password: string): boolean {
        return this.password === password;
    }

    updatePassword(newPassword: string): void {
        this.password = newPassword;
    }
}

