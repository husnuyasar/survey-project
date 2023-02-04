import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiParam, ApiResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { Role } from 'src/decorators/roles.decorator';
import { UserType } from '../users/enum/userType.enum';
import { CreateQuestionDto } from './dto/createQuestion.dto';
import { QuestionFilterDto } from './dto/questionFilter.dto';
import { UpdateQuestionDto } from './dto/updateQuestion.dto';
import { IQuestionsService } from './interface/questions.service.interface';

@ApiTags('Questions')
@Controller('questions')
export class QuestionsController {
    constructor(
        @Inject('IQuestionsService')
        private readonly questionService :IQuestionsService
    ) {}

    @Get(':id')
    @ApiParam({ name: 'id', type: Number, required: true, description: 'Question Id'})
    @ApiOkResponse({description : 'Question detail.'})
    @ApiBearerAuth()
    @ApiUnauthorizedResponse({ description: 'Unauthorized' })
    public async get(@Param('id', ParseIntPipe) id : number) {
        return await this.questionService.get(id);
    }

    @Get()
    @ApiOkResponse({description : 'All questions details.'})
    @ApiBearerAuth()
    @ApiUnauthorizedResponse({ description: 'Unauthorized' })
    public async getAll() {
        return await this.questionService.getAll();
    }

    @Post()
    @ApiCreatedResponse({ description: 'The question has been added successfully!'})
    @Role(UserType.Admin)
    public async create(@Body() dto : CreateQuestionDto) {
        return await this.questionService.create(dto);
    }

    @Put(':id')
    @ApiParam({ name: 'id', type: Number, required: true, description: 'Question Id'})
    @ApiCreatedResponse({ description: 'The question has been updated successfully!'})
    @Role(UserType.Admin)
    public async edit(@Body() dto : UpdateQuestionDto) {
        return await this.questionService.edit(dto);
    }

    @Delete(':id')
    @ApiParam({ name: 'id', type: Number, required: true, description: 'Question Id'})
    @ApiResponse({ description: 'The question has been deleted successfully!'})
    @Role(UserType.Admin)
    public async delete(@Param('id', ParseIntPipe) id : number) {
        return await this.questionService.delete(id);
    }
}
