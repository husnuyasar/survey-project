import { AsyncValidator } from "fluentvalidation-ts";
import { IFormsService } from "src/app/forms/interface/forms.service.interface";
import { Utils } from "src/app/helper/utils";
import { CreateQuestionDto } from "../dto/createQuestion.dto";
import { QuestionType } from "../enum/questionType.enum";

export class CreateQuestionValidator  extends AsyncValidator<CreateQuestionDto> {

    constructor(
        private readonly formService : IFormsService
    ) {

        super();

        this.ruleFor('FormId')
        .mustAsync(
            async (formId) => await this.numberControl(formId)
        )
            .withMessage('The form id cannot be empty')
        .mustAsync(
            async(formId, item) => await this.formControl(formId, item)
        )
            .withMessage('The form not foud')

        this.ruleFor('Label')
        .notEmpty()
            .withMessage('Please enter the label')
        .notNull()
            .withMessage('Please enter the label')
        
        this.ruleFor('Type')
        .must(
            (t) => this.typeControl(t)
        )
            .withMessage('The type is not supported question type')

    }

    private async numberControl(formId : number) : Promise<boolean> {
        return Utils.numberControl(formId);
    }

    private async formControl(id : number, item : CreateQuestionDto) : Promise<boolean> {
        const form = await this.formService.findOne(id);
        if(!form)
            return false;
        item.Form = form;
        return true;
    }

    private typeControl(type: number) : boolean {
        return Object.values(QuestionType).includes(type)
    }
}