export interface UserAuthenticationInterface {
    authenticate(password: string): boolean;
}
