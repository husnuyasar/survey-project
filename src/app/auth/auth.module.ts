import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { IAuthService } from "./interface/auth.service.interface";
import { UsersService } from '../users/users.service';
import { IUserService } from "../users/interface/users.service.interface";
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/entities/users.entity';
import { JwtService } from '@nestjs/jwt';
import { JwtModule } from '@nestjs/jwt/dist';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Users
    ]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions:{
        expiresIn: '60s'
      }
    })
  ],
  providers: [
    {
      provide: 'IAuthService',
      useClass: AuthService
    },
    {
      provide: 'IUserService',
      useClass: UsersService
    },
    JwtService
  ],
  controllers: [AuthController]
})
export class AuthModule {}
