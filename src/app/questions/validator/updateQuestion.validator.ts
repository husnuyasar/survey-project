import { AsyncValidator } from "fluentvalidation-ts";
import { Utils } from "src/app/helper/utils";
import { UpdateQuestionDto } from "../dto/updateQuestion.dto";
import { QuestionType } from "../enum/questionType.enum";
import { IQuestionsService } from "../interface/questions.service.interface";

export class UpdateQuestionValidator  extends AsyncValidator<UpdateQuestionDto> {

    constructor(
        private readonly questionService : IQuestionsService
    ) {

        super();

        this.ruleFor('Id')
        .mustAsync(
            async (id) => await this.numberControl(id)
        )
            .withMessage('The form id cannot be empty')
        .mustAsync(
            async(formId, item) => await this.questionControl(formId, item)
        )
            .withMessage('The question not foud')

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

    private async numberControl(id : number) : Promise<boolean> {
        return Utils.numberControl(id);
    }

    private async questionControl(id : number, item : UpdateQuestionDto) : Promise<boolean> {
        const question = await this.questionService.findOne(id);
        if(!question)
            return false;
        item.Question = question;
        return true;
    }

    private typeControl(type: number) : boolean {
        return Object.values(QuestionType).includes(type)
    }
}