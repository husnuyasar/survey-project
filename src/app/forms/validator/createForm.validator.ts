import { AsyncValidator } from "fluentvalidation-ts";
import { CreateFormDto } from "../dto/createForm.dto";

export class CreateFormValidator  extends AsyncValidator<CreateFormDto> {

    constructor() {

        super();

        this.ruleFor('Label')
        .notEmpty()
            .withMessage('Please enter the label')
        .notNull()
            .withMessage('Please enter the label')

    }
}