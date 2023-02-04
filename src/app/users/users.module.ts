import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { IUserService } from "./interface/users.service.interface";
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegisterMiddleware } from './middleware/register.middleware';
import { Users } from 'src/entities/users.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Users
    ])
  ],
  providers: [
    {
      provide : 'IUserService',
      useClass: UsersService
    }
  ],
  controllers: [UsersController],
  exports: [
    {
      provide : 'IUserService',
      useClass: UsersService
    }
  ]
})

export class UsersModule implements NestModule {
  configure(consumer : MiddlewareConsumer) {
    consumer
      .apply(RegisterMiddleware)
      .forRoutes(
        {path: 'users/register', method: RequestMethod.POST}
      )
  }
}
