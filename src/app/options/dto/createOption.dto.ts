import { ApiProperty } from "@nestjs/swagger";
import { Questions } from "src/entities/questions.entity";

export class CreateOptionDto {
    
    @ApiProperty({
        type : Number,
        description: 'The question id for option'
    })
    QuestionId : number;

    @ApiProperty({
        type: String,
        description: 'Tne label for option' 
    })
    Label : string;

    Question : Questions;
}