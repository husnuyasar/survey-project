import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt/dist";
import { UserFilterDto } from "src/app/users/dto/userFilter.dto";
import { UserType } from "src/app/users/enum/userType.enum";
import { IUserService } from "src/app/users/interface/users.service.interface";
import { UsersService } from "src/app/users/users.service";
import { META_UNPROTECTED } from "src/decorators/unprotected.decorator";
import * as NodeCache from "node-cache";
import { Users } from "src/entities/users.entity";
import { SubmitFormFilterDto } from "src/app/submit-forms/dto/submitFormFilter.dto";

/**
 * Cache added for user info.
 */
const myCache = new NodeCache( 
  {
    stdTTL: 600,
    checkperiod: 200
  }
)

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private readonly reflector : Reflector,
        private readonly jwtService : JwtService,
        private readonly userService : UsersService
    ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    // return validateRequest(request);
    const isUnprotected = this.reflector.get<boolean>(
        META_UNPROTECTED,
        context.getHandler()
    )
    
    /**
     * Public endpoint
     */
    if(isUnprotected)
        return true;
   
    const token = request.headers.authorization;
    if(!token)
      return false;
    const userJson = this.jwtService.decode(token.replace('Bearer ',''));
    if (!userJson)
      return false;

    const filter = new UserFilterDto;
    filter.Email = userJson["email"];
    let user = myCache.get<Users>(filter.Email);
    if(!user) {
      user = await this.userService.get(filter);
      if(!user)
        return false;
      myCache.set(filter.Email,user);  
    }

    /**
     * If the endpoint is create submit forms add user information to request body
     */
    if(request.url == '/submit-forms' && request.method == 'POST'){
      request.body['User'] = user;
    }

    if (request.url == '/submit-forms' && request.method == 'GET') {
      const query = new SubmitFormFilterDto 
      query.Role = user.role;
      query.UserId = user.id;
      request.query = query;
    }
    
    /**
     * If Role decorator exists
     */
    const role = this.reflector.getAllAndOverride<UserType>('roles',[context.getClass(), context.getHandler()]);
    if (role && user.role != role)
      return false
    
    return true;
  }
}