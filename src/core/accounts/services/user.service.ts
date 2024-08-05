import { Injectable, NotFoundException } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { UserInterface } from '../interfaces/user.interface';
import { UserType } from '../enums/user-types.enum';
import { UserStatus } from '../enums/user.status.enum';
import { UserFactory } from '../factories/user.factory';

// Defina o serviço UserService
@Injectable()
export class UserService {
    private readonly filePath = path.resolve('src/user/data/users.json');
    private users: Map<string, UserInterface> = new Map<string, UserInterface>();

    constructor(private readonly userFactory: UserFactory) {
        // Carregar usuários do arquivo JSON na inicialização
        this.loadUsers();
    }

    // Carregar usuários do arquivo JSON
    private loadUsers(): void {
        if (fs.existsSync(this.filePath)) {
            const data = fs.readFileSync(this.filePath, 'utf8');
            const usersArray = JSON.parse(data) as UserInterface[];
            this.users = new Map(usersArray.map(user => [user.id, user]));
        }
    }

    // Salvar usuários no arquivo JSON
    private saveUsers(): void {
        const usersArray = Array.from(this.users.values());
        fs.writeFileSync(this.filePath, JSON.stringify(usersArray, null, 2), 'utf8');
    }

    // Encontrar um usuário pelo ID
    findById(id: string): UserInterface {
        const user = this.users.get(id);
        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
        return user;
    }

    // Adicionar um usuário à lista
    addUser(user: UserInterface): void {
        this.users.set(user.id, user);
        this.saveUsers(); // Salvar no arquivo JSON após adicionar
    }

    // Obter um usuário pelo ID
    getUser(id: string): UserInterface | undefined {
        return this.users.get(id);
    }

    // Criar um novo usuário
    createUser(
        userType: UserType,
        id: string,
        name: string,
        password: string,
        birthDate: string,
        cpf: string,
        phone: string,
        address: string,
        userStatus: UserStatus,
        managerId?: string
    ): UserInterface {
        const user = this.userFactory.createUser(
            userType,
            id,
            name,
            password,
            birthDate,
            cpf,
            phone,
            address,
            userStatus,
            managerId
        );
        this.addUser(user);
        return user;
    }
}
