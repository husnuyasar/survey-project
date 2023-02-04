import { ApiProperty } from "@nestjs/swagger";
import { Forms } from "src/entities/forms.entity";
import { Questions } from "src/entities/questions.entity";
import { Users } from "src/entities/users.entity";

export class CreateSubmitFormDto {
    
    // UserId: number;
    @ApiProperty({
        type : Number,
        description: 'The form id to submit form'
    })
    FormId: number;
    @ApiProperty({
        type : Array<QuestionSelection>,
        description: 'The QuestionSelection id to submit form',
        default: [{QuestionId: 0, Selections: []}]
    })
    QuestionSelections : QuestionSelection [];

    User : Users;
    Form : Forms;
}

export class QuestionSelection {
    @ApiProperty({
        type : Number,
        description: 'The question id for QuestionSelection'
    })
    QuestionId : number;
    @ApiProperty({
        type : Array<Number>,
        description: 'The question id for QuestionSelection'
    })
    Selections : number [];

    Question : Questions;
}