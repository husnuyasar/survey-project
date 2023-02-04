import { AsyncValidator } from "fluentvalidation-ts";
import { IFormsService } from "src/app/forms/interface/forms.service.interface";
import { Utils } from "src/app/helper/utils";
import { QuestionType } from "src/app/questions/enum/questionType.enum";
import { CreateSubmitFormDto } from "../dto/createSubmitForm.dto";

export class CreateSubmitFormValidator extends AsyncValidator<CreateSubmitFormDto> {
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

        this.ruleFor('QuestionSelections')
        .mustAsync(
            async(qSelection, item) => await this.questionAndOptionControl(item)
        )
            .withMessage('Question or Option not found')
        .mustAsync(
            async(qSelection, item) => await this.requiredQuestionControl(item)
        )
            .withMessage('There are required questions')    


    }

    private async numberControl(formId : number) : Promise<boolean> {
        return Utils.numberControl(formId);
    }

    private async formControl(id : number, item : CreateSubmitFormDto) : Promise<boolean> {
        const form = await this.formService.get(id);
        if(!form)
            return false;
        item.Form = form;
        return true;
    }

    private async questionAndOptionControl(item: CreateSubmitFormDto) : Promise<boolean> {
        if(!item.Form)
            return false;
        for (const questionSelection of item.QuestionSelections) {
            const question = item.Form.questions.find(q=>q.id == questionSelection.QuestionId);
            if(!question)
                return false;

            questionSelection.Question = question;
            /**
             * If the question is required to select and there is no selection,
             * don't allow the proccessing
             */
            if(question.is_required === true && (!questionSelection.Selections || questionSelection.Selections.length ==0))
                return false;
            /**
             * If the question support type is single selection but number of selected is more than 1,
             * don't allow the proccessing
             */
            if(question.type == QuestionType.SingleSelection && questionSelection.Selections.length>1)
                return false;
            /**
             * Compare selection option ids and form's question's option ids
             */
            if(!questionSelection.Selections.every(s => question.options.map(o => o.id).includes(s)))
                return false;
        }

        return true;
    }

    private async requiredQuestionControl(item :CreateSubmitFormDto) : Promise<boolean> {
        if(!item.Form)
            return false;
        if(!item.Form.questions.filter(q=> q.is_required == true).map(q=> q.id).every(qId => item.QuestionSelections.map(qSel => qSel.QuestionId).includes(qId)))
            return false;
        return true;
    }
}