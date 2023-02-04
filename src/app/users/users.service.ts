import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entities/users.entity';
import { Repository } from 'typeorm';
import { LoginUserDto } from '../auth/dto/loginUser.dto';
import { CreateUserDto } from './dto/createUser.dto';
import { UserFilterDto } from './dto/userFilter.dto';
import { IUserService } from './interface/users.service.interface';

@Injectable()
export class UsersService implements IUserService {

    constructor(
        @InjectRepository(Users) private readonly userRepository: Repository<Users>
    ) {}

    public async create(dto) : Promise<Users> {
        const user = new Users;
        user.firstname = dto.FirstName;
        user.lastname = dto.LastName;
        user.email = dto.Email;
        user.password = dto.Password;
        user.role = dto.Role;

        const result = await this.userRepository.insert(user);
        const newId = result.raw[0].id;
        return await this.userRepository.findOne(newId);
    }

    public async get(filter : UserFilterDto) : Promise<Users> {
        let user =  await this.userRepository.createQueryBuilder('u');
        if (filter.Id) {
            user.andWhere('u.id =:id', {id : filter.Id})
        }
        if (filter.Email) {
            user.andWhere('u.email =:email', {email : filter.Email})
        }
        return await user.getOne();
    }

    public async getLoginUser(dto: LoginUserDto): Promise<Users> {
        return await this.userRepository.createQueryBuilder('u')
            .andWhere('u.email =:email', {email: dto.Email})
            .andWhere('u.password =:password', {password: dto.Password})
            .getOne();
    }

    /**
     * User registration method
     * return user entity data.
     * @param dto 
     */
    public async register(dto: CreateUserDto): Promise<Users> {
        return await this.create(dto);
    }

    

}
