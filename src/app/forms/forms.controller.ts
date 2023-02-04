import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiParam, ApiResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { Role } from 'src/decorators/roles.decorator';
import { UserType } from '../users/enum/userType.enum';
import { CreateFormDto } from './dto/createForm.dto';
import { UpdateFormDto } from './dto/updateForm.dto';
import { IFormsService } from './interface/forms.service.interface';

@ApiTags('Forms')
@Controller('forms')
export class FormsController {
    constructor(
        @Inject('IFormsService')
        private readonly formService : IFormsService
    ) {}

    @Get(':id')
    @ApiParam({ name: 'id', type: Number, required: true, description: 'Form Id'})
    @ApiOkResponse({description : 'Form detail.'})
    @ApiBearerAuth()
    @ApiUnauthorizedResponse({ description: 'Unauthorized' })
    public async get(@Param('id', ParseIntPipe) id : number) {
        return await this.formService.get(id);
    }

    @Get()
    @ApiOkResponse({description : 'All forms details.'})
    @ApiBearerAuth()
    @ApiUnauthorizedResponse({ description: 'Unauthorized' })
    public async getAll() {
        return await this.formService.getAll();
    }

    @Post()
    @ApiCreatedResponse({ description: 'The form has been added successfully!'})
    @Role(UserType.Admin)
    public async create(@Body() dto : CreateFormDto) {
        return await this.formService.create(dto);
    }

    @Put(':id')
    @ApiParam({ name: 'id', type: Number, required: true, description: 'Form Id'})
    @ApiCreatedResponse({ description: 'The form has been updated successfully!'})
    @Role(UserType.Admin)
    public async edit(@Body() dto : UpdateFormDto) {
        return await this.formService.edit(dto);
    }

    @Delete(':id')
    @ApiParam({ name: 'id', type: Number, required: true, description: 'Form Id'})
    @ApiResponse({ description: 'The form has been deleted successfully!'})
    @Role(UserType.Admin)
    public async delete(@Param('id', ParseIntPipe) id : number) {
        return await this.formService.delete(id);
    }
}
