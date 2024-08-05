import { UserService } from './../services/user.service';
import { Controller, Post, Body } from '@nestjs/common';
import { UserType } from '../enums/user-types.enum';
import { UserStatus } from '../enums/user.status.enum';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    createUser(@Body() createUserDto: any) {
        const { userType, id, name, password, birthDate, cpf, phone, address, userStatus } = createUserDto;
        return this.userService.createUser(
            userType,
            id,
            name,
            password,
            birthDate,
            cpf,
            phone,
            address,
            userStatus
        );
    }
}

