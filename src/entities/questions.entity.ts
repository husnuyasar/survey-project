import { BoolBitTransformer } from "src/app/helper/boolBitTransformer";
import { QuestionType } from "src/app/questions/enum/questionType.enum";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Forms } from "./forms.entity";
import { Options } from "./options.entity";

@Entity()
export class Questions {
    @PrimaryGeneratedColumn()
    id : number;

    @Column({
        nullable: false
    })
    label : string;

    @Column({
        type: 'bit',
        default: () => `"'b'0''"`,
        transformer: new BoolBitTransformer()
    })
    is_required : boolean;

    @CreateDateColumn()
    created_at : Date;

    @UpdateDateColumn()
    updated_at : Date;

    @Column({
        nullable: false
    })
    type : QuestionType

    @ManyToOne(type => Forms, form => form.questions)
    @JoinColumn({ name: "form_id" })
    form : Forms   

    @OneToMany(type=> Options, option=> option.question)
    options : Options []
}