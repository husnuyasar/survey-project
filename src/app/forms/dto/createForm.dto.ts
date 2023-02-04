import { ApiProperty } from "@nestjs/swagger";

export class CreateFormDto {
    @ApiProperty({
        type: String,
        description: 'Tne label for form' 
    })
    Label : string;
}