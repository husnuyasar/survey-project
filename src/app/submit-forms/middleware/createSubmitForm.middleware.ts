import { HttpStatus, Inject, Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction,Request,Response } from "express";
import { IFormsService } from "src/app/forms/interface/forms.service.interface";
import { CreateSubmitFormValidator } from "../validator/createSubmitForm.validator";

@Injectable()
export class CreateSubmitFormMiddleware implements NestMiddleware {

    constructor(
        @Inject('IFormsService')
        private readonly formService : IFormsService
    ) {}
    
    async use(req: Request, res: Response, next: NextFunction) {
        const validator = new CreateSubmitFormValidator(this.formService);
        const err = await validator.validateAsync(req.body);
        if (Object.keys(err).length !== 0) {
            res.statusCode = HttpStatus.UNPROCESSABLE_ENTITY;
            return res.json(err)
        }
        next();
    }

}