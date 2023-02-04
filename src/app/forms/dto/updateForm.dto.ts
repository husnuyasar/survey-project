import { ApiProperty } from "@nestjs/swagger";
import { Forms } from "src/entities/forms.entity";

export class UpdateFormDto {
    
    Id : number;
    @ApiProperty({
        type: String,
        description: 'Tne label for form' 
    })
    Label : string;

    Form : Forms;
}