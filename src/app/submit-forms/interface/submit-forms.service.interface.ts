import { UserType } from "src/app/users/enum/userType.enum";
import { SubmitForms } from "src/entities/submitForms.entity";
import { CreateSubmitFormDto } from "../dto/createSubmitForm.dto";
import { SubmitFormFilterDto } from "../dto/submitFormFilter.dto";

export interface ISubmitFormsService {
    get(id: number) : Promise<SubmitForms>;
    getAll(filter: SubmitFormFilterDto) : Promise<SubmitForms []>;
    create(dto : CreateSubmitFormDto) : Promise<SubmitForms>;
}