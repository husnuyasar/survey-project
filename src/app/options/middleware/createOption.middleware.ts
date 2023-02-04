import { HttpStatus, Inject, Injectable, NestMiddleware } from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { NextFunction, Response, Request } from "express";
import { IQuestionsService } from "src/app/questions/interface/questions.service.interface";
import { CreateOptionDto } from "../dto/createOption.dto";
import { CreateOptionValidator } from "../validator/createOption.validator";

@Injectable()
export class CreateOptionMiddleware implements NestMiddleware {

    constructor(
        @Inject('IQuestionsService')
        private readonly questionService : IQuestionsService
    ) {}
    
    async use(req: Request, res: Response, next: NextFunction) {
        req.body = plainToClass(CreateOptionDto,req.body)
        const validator = new CreateOptionValidator(this.questionService);
        const err = await validator.validateAsync(req.body);
        if (Object.keys(err).length !== 0) {
            res.statusCode = HttpStatus.UNPROCESSABLE_ENTITY;
            return res.json(err)
        }
        next();
    }

}