import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ApiBasicAuth, ApiBearerAuth, ApiCreatedResponse, ApiHeader, ApiTags } from '@nestjs/swagger/dist';
import { Role } from 'src/decorators/roles.decorator';
import { UnProtected } from 'src/decorators/unprotected.decorator';
import { CreateUserDto } from './dto/createUser.dto';
import { UserType } from './enum/userType.enum';
import { IUserService } from './interface/users.service.interface';

@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor(@Inject('IUserService')
        private userService : IUserService
    ) {}

    @UnProtected()
    @Post('register')
    @ApiCreatedResponse({ description: 'The user has been added successfully!'})
    public async register(@Body() dto : CreateUserDto) {
        return await this.userService.register(dto);
        // return await this.userService.get(1);
    }

    @Get()
    @Role(UserType.Admin)
    public async hello() {
       return "Hello"; 
    }
}
