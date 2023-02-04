import { HttpStatus, Inject, Injectable, NestMiddleware } from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { NextFunction, Request, Response } from "express";
import { UpdateOptionDto } from "../dto/updateOption.dto";
import { IOptionsService } from "../interface/options.service.interface";
import { UpdateOptionValidator } from "../validator/updateOption.validator";

@Injectable()
export class UpdateOptionMiddleware implements NestMiddleware {

    constructor(
        @Inject('IOptionsService')
        private readonly questionService : IOptionsService
    ) {}
    
    async use(req: Request, res: Response, next: NextFunction) {
        req.body = plainToClass(UpdateOptionDto,req.body)
        req.body["Id"] = req.params.id;
        const validator = new UpdateOptionValidator(this.questionService);
        const err = await validator.validateAsync(req.body);
        if (Object.keys(err).length !== 0) {
            res.statusCode = HttpStatus.UNPROCESSABLE_ENTITY;
            return res.json(err)
        }
        next();
    }

}