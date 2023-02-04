import { HttpStatus, Inject, Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { IUserService } from "../interface/users.service.interface";
import RegisterValidator from "../validator/register.validator";

@Injectable()
export class RegisterMiddleware implements NestMiddleware {

    constructor(
        @Inject('IUserService')
        private readonly userService : IUserService
    ) {}
    
    async use(req: Request, res: Response, next: NextFunction) {
        const validator = new RegisterValidator(this.userService);
        const err = await validator.validateAsync(req.body);
        if (Object.keys(err).length !== 0) {
            res.statusCode = HttpStatus.UNPROCESSABLE_ENTITY;
            return res.json(err)
        }
        next();
    }

}