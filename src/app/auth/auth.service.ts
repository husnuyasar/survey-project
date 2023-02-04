import { HttpException, HttpStatus, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { IUserService } from '../users/interface/users.service.interface';
import { LoginUserDto } from './dto/loginUser.dto';
import { IAuthService } from './interface/auth.service.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService implements IAuthService {
    constructor(
       @Inject('IUserService')
       private readonly userService : IUserService,
       private readonly jwtService: JwtService, 
    ) {}

    public async login(dto: LoginUserDto): Promise<any> {
        try {
            const user = await this.userService.getLoginUser(dto);
            if(!user){
                throw new UnauthorizedException('Invalid token'); 
            }
            const payload = {
                id : user.id,
                email : user.email,
                role : user.role
            }
            return {
                userEmail : user.email,
                userId: user.id,
                userRole : user.role,
                access_token : this.jwtService.sign(JSON.stringify(payload), {secret: process.env.JWT_SECRET}),
                expiredAt : Date.now() + 60000            
            }
            
        } catch (error) {
            throw new Error(error.message);
        }
       
    }


}
