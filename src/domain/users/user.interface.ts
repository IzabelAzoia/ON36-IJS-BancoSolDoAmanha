
export interface UserDetailsInterface {
    getUserData(): string;
    updateUser(name: string, address: string, phone: string, password: string): void;
}

export interface UserInterface {
    id: string;
    name: string;
    email: string;
}
