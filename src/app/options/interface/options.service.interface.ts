import { Options } from "src/entities/options.entity";
import { CreateOptionDto } from "../dto/createOption.dto";
import { UpdateOptionDto } from "../dto/updateOption.dto";

export interface IOptionsService {
    create(dto : CreateOptionDto) : Promise<Options>;
    edit(dto : UpdateOptionDto) : Promise<Options>;
    delete(id : number) : Promise<boolean>;
    findOne(id : number) : Promise<Options>;
    getAll() : Promise<Options []>;
}