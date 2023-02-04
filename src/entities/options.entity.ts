import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Questions } from "./questions.entity";

@Entity()
export class Options {
    @PrimaryGeneratedColumn()
    id : number;

    @Column({
        nullable: false
    })
    label : string;

    @CreateDateColumn()
    created_at : Date;

    @UpdateDateColumn()
    updated_at : Date;

    @ManyToOne(type => Questions, question => question.options)
    @JoinColumn({ name: "question_id" })
    question : Questions   
}