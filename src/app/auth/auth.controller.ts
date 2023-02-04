import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UnProtected } from 'src/decorators/unprotected.decorator';
import { LoginUserDto } from './dto/loginUser.dto';
import { IAuthService } from './interface/auth.service.interface';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {

    constructor(@Inject('IAuthService')
        private readonly authService : IAuthService
    ) {}

    @Post('login')
    @UnProtected()
    @ApiOkResponse(({ description: 'The login process was successful'}))
    public async login(@Body() dto : LoginUserDto) {
        return await this.authService.login(dto);
    }
}
