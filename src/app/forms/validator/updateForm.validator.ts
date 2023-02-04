import { AsyncValidator } from "fluentvalidation-ts";
import { Utils } from "src/app/helper/utils";
import { UpdateFormDto } from "../dto/updateForm.dto";
import { IFormsService } from "../interface/forms.service.interface";

export class UpdateFormValidator  extends AsyncValidator<UpdateFormDto> {

    constructor(
        private readonly formService : IFormsService
    ) {

        super();

        this.ruleFor('Id')
        .mustAsync(
            async (id) => await this.numberControl(id) 
        )
            .withMessage('Please enter the id')
        .mustAsync(
            async (id, item) => await this.formControl(id, item)
        )
            .withMessage('The form not found')

        this.ruleFor('Label')
        .notEmpty()
            .withMessage('Please enter the label')
        .notNull()
            .withMessage('Please enter the label')

    }

    private async numberControl(id : number) {
        return Utils.numberControl(id);
    }

    private async formControl(id : number, item : UpdateFormDto) : Promise<boolean> {
        const form = await this.formService.get(id);
        if(!form)
            return false;
        item.Form = form;
        return true;
    }
}