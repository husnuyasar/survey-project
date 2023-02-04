import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Options } from "./options.entity";
import { SubmitQuestions } from "./submitQuestions.entity";

@Entity({
    name: 'submit_options'
})
export class SubmitOptions {
    @PrimaryGeneratedColumn()
    id : number;

    @ManyToOne(type=> SubmitQuestions, submitQuestion=> submitQuestion.SubmitOptions)
    @JoinColumn({ name: "submit_question_id" })
    SubmitQuestion : SubmitQuestions

    @ManyToOne(type=> Options, option=> option.id)
    @JoinColumn({ name: "option_id" })
    Option : Options
}