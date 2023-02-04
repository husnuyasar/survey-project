import { LoginUserDto } from "../dto/loginUser.dto";

export interface IAuthService {
    login(dto: LoginUserDto) : Promise<any>;
}