import { HttpStatus, Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { CreateFormValidator } from "../validator/createForm.validator";

@Injectable()
export class CreateFormMiddleware implements NestMiddleware {

    constructor(
    ) {}
    
    async use(req: Request, res: Response, next: NextFunction) {
        const validator = new CreateFormValidator();
        const err = await validator.validateAsync(req.body);
        if (Object.keys(err).length !== 0) {
            res.statusCode = HttpStatus.UNPROCESSABLE_ENTITY;
            return res.json(err)
        }
        next();
    }

}