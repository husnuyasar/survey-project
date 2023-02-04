import { Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Questions } from "./questions.entity";
import { SubmitForms } from "./submitForms.entity";
import { SubmitOptions } from "./submitOptions.entity";

@Entity({
    name: 'submit_questions'
})
export class SubmitQuestions {
    @PrimaryGeneratedColumn()
    id : number;

    @ManyToOne(type=> SubmitForms, submitForm=> submitForm.SubmitQuestions)
    @JoinColumn({ name: "submit_form_id" })
    SubmitForm : SubmitForms

    @ManyToOne(type=> Questions, question=> question.id)
    @JoinColumn({ name: "question_id" })
    Question : Questions

    @OneToMany(type=>SubmitOptions, submitOption => submitOption.SubmitQuestion)
    SubmitOptions : SubmitOptions []
}