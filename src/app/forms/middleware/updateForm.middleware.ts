import { HttpStatus, Inject, Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { IFormsService } from "../interface/forms.service.interface";
import { CreateFormValidator } from "../validator/createForm.validator";
import { UpdateFormValidator } from "../validator/updateForm.validator";

@Injectable()
export class UpdateFormMiddleware implements NestMiddleware {

    constructor(
        @Inject('IFormsService')
        private readonly formService : IFormsService
    ) {}
    
    async use(req: Request, res: Response, next: NextFunction) {
        const validator = new UpdateFormValidator(this.formService);
        req.body["Id"] = req.params.id;
        const err = await validator.validateAsync(req.body);
        if (Object.keys(err).length !== 0) {
            res.statusCode = HttpStatus.UNPROCESSABLE_ENTITY;
            return res.json(err)
        }
        next();
    }

}