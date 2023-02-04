import { AsyncValidator } from "fluentvalidation-ts";
import { Utils } from "src/app/helper/utils";
import { CreateUserDto } from "../dto/createUser.dto";
import { UserFilterDto } from "../dto/userFilter.dto";
import { IUserService } from "../interface/users.service.interface";

export default class RegisterValidator extends AsyncValidator<CreateUserDto> {
    constructor(
        private readonly userService : IUserService
    ) {
        super();

        this.ruleFor('FirstName')
        .notEmpty()
            .withMessage('Please enter the FirstName')
        .notNull()
            .withMessage('Please enter the FirstName')
        
        this.ruleFor('LastName')
        .notEmpty()
            .withMessage('Please enter the LastName')
        .notNull()
            .withMessage('Please enter the LastName')

        this.ruleFor('Email')
        .mustAsync(
            async(e) => await this.isEmptyOrNull(e)
        )
            .withMessage('Please enter email')
        .mustAsync(
            async(e) => await this.emailFormat(e)
        )
            .withMessage('Please enter correct email')
        .mustAsync(
            async(e) => await this.emailCheck(e)
        )
            .withMessage('Email address should be unique for any account')
    

        this.ruleFor('Password')
        .notEmpty()
            .withMessage('Please enter the password')
        .notNull()
            .withMessage('Please enter the password')
    }

    private async isEmptyOrNull(email :string) : Promise<boolean> {
        return Utils.isEmptyOrNull(email);
    }

    private async emailFormat(email : string) : Promise<boolean> {
        var emailFormat = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
        if (email !== '' && email.match(emailFormat)) 
            return true; 
        return false;
    }

    private async emailCheck(email : string) : Promise<boolean> {
        const filter = new UserFilterDto;
        filter.Email = email;
        const user = await this.userService.get(filter);
        return user ? false : true;
    }
}