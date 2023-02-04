import { ApiProperty } from "@nestjs/swagger";

export class LoginUserDto {
    @ApiProperty({
        type: String,
        description: 'Email for login',
        default: 'husnuyasar58@gmail.com' 
    })
    Email : string;
    @ApiProperty({
        type: String,
        description: 'Password for login' ,
        default: '1234'
    })
    Password : string;
}