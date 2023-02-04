import { ApiProperty } from "@nestjs/swagger";
import { Forms } from "src/entities/forms.entity";
import { QuestionType } from "../enum/questionType.enum";

export class CreateQuestionDto {

    @ApiProperty({
        type : Number,
        description: 'The form id for question'
    })
    FormId : number;

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

    Form : Forms;
}