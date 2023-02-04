import { Body, Controller, Get, Inject, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiParam, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { Role } from 'src/decorators/roles.decorator';
import { UserType } from '../users/enum/userType.enum';
import { CreateSubmitFormDto } from './dto/createSubmitForm.dto';
import { SubmitFormFilterDto } from './dto/submitFormFilter.dto';
import { ISubmitFormsService } from './interface/submit-forms.service.interface';

@ApiTags('Submit Forms')
@Controller('submit-forms')
export class SubmitFormsController {
    constructor(
        @Inject('ISubmitFormsService')
        private readonly submitFormService : ISubmitFormsService
    ) {}

    @Get(':id')
    @ApiParam({ name: 'id', type: Number, required: true, description: 'Submit Form Id'})
    @ApiOkResponse({description : 'Submit Form detail.'})
    @ApiBearerAuth()
    @ApiUnauthorizedResponse({ description: 'Unauthorized' })
    public async get(@Param('id', ParseIntPipe) id : number) {
        return await this.submitFormService.get(id);
    }

    @Get()
    @ApiOkResponse({description : 'All questions details.'})
    @ApiBearerAuth()
    @ApiUnauthorizedResponse({ description: 'Unauthorized' })
    public async getAll(@Query() dto : SubmitFormFilterDto) {
        return await this.submitFormService.getAll(dto);
    }

    @Post()
    @ApiCreatedResponse({ description: 'The form has been submited successfully!'})
    @Role(UserType.User)
    public async create(@Body() dto : CreateSubmitFormDto) {
        return await this.submitFormService.create(dto);
    }
}
