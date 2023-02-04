import { BeforeUpdate, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Questions } from "./questions.entity";

@Entity()
export class Forms {

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

    @OneToMany(type => Questions, question => question.form)
    questions : Questions []
}