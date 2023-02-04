import { ApiProperty } from "@nestjs/swagger";
import { Options } from "src/entities/options.entity";

export class UpdateOptionDto {
    Id : number;

    @ApiProperty({
        type : String,
        description: 'The label for option'
    })
    Label : string;

    Option : Options;
}