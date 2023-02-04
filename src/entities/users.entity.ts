import { UserType } from "src/app/users/enum/userType.enum";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Users {
    @PrimaryGeneratedColumn()
    id : number;

    @Column({
        nullable: false
    })
    firstname : string;

    @Column({
        nullable: false
    })
    lastname : string;

    @Column({
        nullable: false
    })
    email : string;

    @Column({
        nullable: false
    })
    password : string;

    @Column({
        nullable: false
    })
    role : UserType;
}