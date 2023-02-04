import { ApiProperty } from "@nestjs/swagger";
import { Questions } from "src/entities/questions.entity";
import { QuestionType } from "../enum/questionType.enum";

export class UpdateQuestionDto {

    Id : number;

    @ApiProperty({
        type : String,
        description: 'The label for question'
    })
    Label : string;

    @ApiProperty({
        type : Number,
        description: 'Supported question types for question (0 : Single selection, 1 : Multiple selection)',
        default : QuestionType.SingleSelection
    })
    Type : QuestionType

    @ApiProperty({
        type : Number,
        description: 'Mark as required',
        nullable: false
    })
    IsRequired : boolean

    Question : Questions;
}