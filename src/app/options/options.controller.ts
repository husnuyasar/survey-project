import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiParam, ApiResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { Role } from 'src/decorators/roles.decorator';
import { UserType } from '../users/enum/userType.enum';
import { CreateOptionDto } from './dto/createOption.dto';
import { UpdateOptionDto } from './dto/updateOption.dto';
import { IOptionsService } from './interface/options.service.interface';

@ApiTags('Options')
@Controller('options')
export class OptionsController {
    constructor(
        @Inject('IOptionsService')
        private readonly optionService : IOptionsService
    ) {}

    @Get(':id')
    @ApiParam({ name: 'id', type: Number, required: true, description: 'Option Id'})
    @ApiOkResponse({description : 'Option detail.'})
    @ApiBearerAuth()
    @ApiUnauthorizedResponse({ description: 'Unauthorized' })
    public async get(@Param('id', ParseIntPipe) id : number) {
        return await this.optionService.findOne(id);
    }

    @Get()
    @ApiOkResponse({description : 'All options details.'})
    @ApiBearerAuth()
    @ApiUnauthorizedResponse({ description: 'Unauthorized' })
    public async getAll() {
        return await this.optionService.getAll();
    }

    @Post()
    @ApiCreatedResponse({ description: 'The option has been added successfully!'})
    @Role(UserType.Admin)
    public async create(@Body() dto : CreateOptionDto) {
        return await this.optionService.create(dto);
    }

    @Put(':id')
    @ApiParam({ name: 'id', type: Number, required: true, description: 'Option Id'})
    @ApiCreatedResponse({ description: 'The option has been updated successfully!'})
    @Role(UserType.Admin)
    public async edit(@Body() dto : UpdateOptionDto) {
        return await this.optionService.edit(dto);
    }

    @Delete(':id')
    @ApiParam({ name: 'id', type: Number, required: true, description: 'Option Id'})
    @ApiResponse({ description: 'The option has been deleted successfully!'})
    @Role(UserType.Admin)
    public async delete(@Param('id', ParseIntPipe) id : number) {
        return await this.optionService.delete(id);
    }
}
