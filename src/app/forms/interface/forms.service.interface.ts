import { Forms } from "src/entities/forms.entity";
import { CreateFormDto } from "../dto/createForm.dto";
import { UpdateFormDto } from "../dto/updateForm.dto";

export interface IFormsService {
    create(dto : CreateFormDto) : Promise<Forms>;
    get(id: number) : Promise<Forms>;
    findOne(id : number) : Promise<Forms>;
    getAll() : Promise<Forms []>;
    edit(dto : UpdateFormDto) : Promise<Forms>;
    delete(id : number) : Promise<boolean>;
}