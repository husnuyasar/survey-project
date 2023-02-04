import { LoginUserDto } from "src/app/auth/dto/loginUser.dto";
import { Users } from "src/entities/users.entity";
import { CreateUserDto } from "../dto/createUser.dto";
import { UserFilterDto } from "../dto/userFilter.dto";

export interface IUserService {
    register(dto : CreateUserDto) : Promise<Users>;
    get(dto: UserFilterDto) : Promise<Users>;
    getLoginUser(dto: LoginUserDto) : Promise<Users>;
}