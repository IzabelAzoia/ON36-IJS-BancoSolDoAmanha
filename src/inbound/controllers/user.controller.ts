import { UserService } from '../../domain/users/services/user.service';
import { Controller, Post, Body } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    createUser(@Body() createUserDto: CreateUserDto) {
        const { 
            userType, 
            id, 
            name, 
            password, 
            birthDate, 
            cpf, 
            phone, 
            address, 
            userStatus, 
            email, 
            managerId 
        } = createUserDto;

        return this.userService.createUser(
            userType, 
            id, 
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
    }
}