import { ApiProperty } from "@nestjs/swagger/dist/decorators";
import { UserType } from "../enum/userType.enum";

export class CreateUserDto {
    @ApiProperty({
        type: String,
        description: 'The firstname of user'
    })
    FirstName : string;
    @ApiProperty({
        type: String,
        description: 'The lastname of user'
    })
    LastName : string;
    @ApiProperty({
        type: String,
        description: 'The password of user'
    })
    Password: string;
    @ApiProperty({
        type: String,
        description: 'The email of user'
    })
    Email : string;
    @ApiProperty({
        type: Number,
        description: 'The role of user. The Role can be “Admin : 1” or “User : 0”.',
        default: Number(UserType.User)
    })
    Role : UserType
}