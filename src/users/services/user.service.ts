import { UserInterface } from '../interfaces/user.interface';
import { Injectable, NotFoundException } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { UserType } from '../enums/user-types.enum';
import { UserStatus } from '../enums/user.status.enum';
import { UserFactory } from '../factories/user.factory';
import { User } from '../models/user.model';

export class UserService {
    private readonly filePath = path.resolve('src/user/data/users.json');
    private users: Map<string, UserInterface> = new Map<string, UserInterface>();

    constructor(private readonly userFactory: UserFactory) {
        this.loadUsers();
    }

    private loadUsers(): void {
        if (fs.existsSync(this.filePath)) {
            const data = fs.readFileSync(this.filePath, 'utf8');
            const usersArray = JSON.parse(data) as UserInterface[];
            this.users = new Map(usersArray.map(user => [user.id, user]));
        }
    }

    private saveUsers(): void {
        const usersArray = Array.from(this.users.values());
        fs.writeFileSync(this.filePath, JSON.stringify(usersArray, null, 2), 'utf8');
    }

    findById(id: string): UserInterface {
        const user = this.users.get(id);
        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
        return user;
    }

    addUser(user: UserInterface): void {
        this.users.set(user.id, user);
        this.saveUsers();
    }

    getUser(id: string): UserInterface | undefined {
        return this.users.get(id);
    }

    createUser(
        userType: UserType,
        id: string,
        role: string,
        name: string,
        password: string,
        birthDate: string,
        cpf: string,
        phone: string,
        address: string,
        userStatus: UserStatus,
        email: string,
        managerId?: string
    ): UserInterface {
        const user = this.userFactory.createUser(
            userType,
            id,
            role,
            name,
            password,
            birthDate,
            cpf,
            phone,
            address,
            userStatus,
            email,
            managerId
        );
        this.addUser(user);
        return user;
    }
}