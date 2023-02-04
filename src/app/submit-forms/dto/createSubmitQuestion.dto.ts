import { SubmitForms } from "src/entities/submitForms.entity";
import { QuestionSelection } from "./createSubmitForm.dto";

export class CreateSubmitQuestionDto {
    SubmitForm : SubmitForms;
    QuestionSelections : QuestionSelection
}