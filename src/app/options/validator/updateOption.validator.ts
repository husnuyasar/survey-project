import { AsyncValidator } from "fluentvalidation-ts";
import { Utils } from "src/app/helper/utils";
import { UpdateOptionDto } from "../dto/updateOption.dto";
import { IOptionsService } from "../interface/options.service.interface";

export class UpdateOptionValidator  extends AsyncValidator<UpdateOptionDto> {

    constructor(
        private readonly optionService : IOptionsService
    ) {

        super();

        this.ruleFor('Id')
        .mustAsync(
            async (id) => await this.numberControl(id)
        )
            .withMessage('The question id cannot be empty')
        .mustAsync(
            async(qId, item) => await this.optionControl(qId, item)
        )
            .withMessage('The question not foud')

        this.ruleFor('Label')
        .notEmpty()
            .withMessage('Please enter the label')
        .notNull()
            .withMessage('Please enter the label')

    }

    private async numberControl(id : number) : Promise<boolean> {
        return Utils.numberControl(id);
    }

    private async optionControl(id : number, item : UpdateOptionDto) : Promise<boolean> {
        const option = await this.optionService.findOne(id);
        if(!option)
            return false;
        item.Option = option;
        return true;
    }
}