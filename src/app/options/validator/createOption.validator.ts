import { AsyncValidator } from "fluentvalidation-ts";
import { Utils } from "src/app/helper/utils";
import { IQuestionsService } from "src/app/questions/interface/questions.service.interface";
import { CreateOptionDto } from "../dto/createOption.dto";

export class CreateOptionValidator  extends AsyncValidator<CreateOptionDto> {

    constructor(
        private readonly questionService : IQuestionsService
    ) {

        super();

        this.ruleFor('QuestionId')
        .mustAsync(
            async (qId) => await this.numberControl(qId)
        )
            .withMessage('The question id cannot be empty')
        .mustAsync(
            async(qId, item) => await this.questionControl(qId, item)
        )
            .withMessage('The question not foud')

        this.ruleFor('Label')
        .notEmpty()
            .withMessage('Please enter the label')
        .notNull()
            .withMessage('Please enter the label')

    }

    private async numberControl(qId : number) : Promise<boolean> {
        return Utils.numberControl(qId);
    }

    private async questionControl(id : number, item : CreateOptionDto) : Promise<boolean> {
        const question = await this.questionService.findOne(id);
        if(!question)
            return false;
        item.Question = question;
        return true;
    }
}