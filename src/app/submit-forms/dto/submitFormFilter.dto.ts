import { UserType } from "src/app/users/enum/userType.enum";

export class SubmitFormFilterDto {
    Role : UserType;
    UserId?: number;
}