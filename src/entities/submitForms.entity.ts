import { CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Forms } from "./forms.entity";
import { SubmitQuestions } from "./submitQuestions.entity";
import { Users } from "./users.entity";

@Entity({
    name: 'submit_forms'
})
export class SubmitForms {
    @PrimaryGeneratedColumn()
    id : number;

    @CreateDateColumn()
    created_at : Date;

    @UpdateDateColumn()
    updated_at : Date;

    @ManyToOne(type=> Users, user=> user.id)
    @JoinColumn({ name: "user_id" })
    User : Users

    @ManyToOne(type=> Forms, form=> form.id)
    @JoinColumn({ name: "form_id" })
    Form : Forms

    @OneToMany(type=> SubmitQuestions, submitQuestion=>submitQuestion.SubmitForm)
    SubmitQuestions: SubmitQuestions [];
}
