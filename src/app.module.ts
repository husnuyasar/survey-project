import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from './config/typeorm.config.service';
import { UsersModule } from './app/users/users.module';
import { AuthModule } from './app/auth/auth.module';
import { APP_GUARD, Reflector } from '@nestjs/core';
import { AuthGuard } from './app/auth/guard/auth.guard';
import { Users } from './entities/users.entity';
import { JwtModule, JwtService } from '@nestjs/jwt/dist';
import { UsersService } from './app/users/users.service';
import { IUserService } from './app/users/interface/users.service.interface';
import { FormsModule } from './app/forms/forms.module';
import { QuestionsModule } from './app/questions/questions.module';
import { OptionsModule } from './app/options/options.module';
import { SubmitFormsModule } from './app/submit-forms/submit-forms.module';
import { HomeController } from './app/home/home.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      logging: true,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false,
    }),
    TypeOrmModule.forFeature([Users]),
    UsersModule,
    AuthModule,
    JwtModule.register({
      secret : process.env.JWT_SECRET,
      signOptions: {
        expiresIn: 30
      }
    }),
    FormsModule,
    QuestionsModule,
    OptionsModule,
    SubmitFormsModule
  ],
  providers: [
    JwtService,
    UsersService,
    {
      provide: APP_GUARD,
      useFactory: (ref, jwt, uSer) => new AuthGuard(ref, jwt, uSer),
      inject: [Reflector, JwtService, UsersService]
    }
  ],
  controllers: [HomeController],
})
export class AppModule {}
