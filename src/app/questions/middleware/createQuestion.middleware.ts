import { HttpStatus, Inject, Injectable, NestMiddleware } from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { NextFunction, Request, Response } from "express";
import { IFormsService } from "src/app/forms/interface/forms.service.interface";
import { CreateQuestionDto } from "../dto/createQuestion.dto";
import { CreateQuestionValidator } from "../validator/createQuestion.validator";

@Injectable()
export class CreateQuestionMiddleware implements NestMiddleware {

    constructor(
        @Inject('IFormsService')
        private readonly formService : IFormsService
    ) {}
    
    async use(req: Request, res: Response, next: NextFunction) {
        req.body = plainToClass(CreateQuestionDto,req.body)
        const validator = new CreateQuestionValidator(this.formService);
        const err = await validator.validateAsync(req.body);
        if (Object.keys(err).length !== 0) {
            res.statusCode = HttpStatus.UNPROCESSABLE_ENTITY;
            return res.json(err)
        }
        next();
    }

}