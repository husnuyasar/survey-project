import { HttpStatus, Inject, Injectable, NestMiddleware } from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { NextFunction, Request, Response } from "express";
import { UpdateQuestionDto } from "../dto/updateQuestion.dto";
import { IQuestionsService } from "../interface/questions.service.interface";
import { UpdateQuestionValidator } from "../validator/updateQuestion.validator";

@Injectable()
export class UpdateQuestionMiddleware implements NestMiddleware {

    constructor(
        @Inject('IQuestionsService')
        private readonly questionService : IQuestionsService
    ) {}
    
    async use(req: Request, res: Response, next: NextFunction) {
        req.body = plainToClass(UpdateQuestionDto,req.body)
        req.body["Id"] = req.params.id;
        const validator = new UpdateQuestionValidator(this.questionService);
        const err = await validator.validateAsync(req.body);
        if (Object.keys(err).length !== 0) {
            res.statusCode = HttpStatus.UNPROCESSABLE_ENTITY;
            return res.json(err)
        }
        next();
    }

}