import { Questions } from "src/entities/questions.entity";
import { CreateQuestionDto } from "../dto/createQuestion.dto";
import { QuestionFilterDto } from "../dto/questionFilter.dto";
import { UpdateQuestionDto } from "../dto/updateQuestion.dto";

export interface IQuestionsService {
    create(dto : CreateQuestionDto) : Promise<Questions>;
    edit(dto : UpdateQuestionDto) : Promise<Questions>;
    delete(id : number) : Promise<boolean>;
    findOne(id : number) : Promise<Questions>;
    get(id : number) : Promise<Questions>;
    getAll() : Promise<Questions []>;
}