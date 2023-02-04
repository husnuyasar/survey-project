import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Questions } from 'src/entities/questions.entity';
import { Repository } from 'typeorm';
import { IOptionsService } from '../options/interface/options.service.interface';
import { CreateQuestionDto } from './dto/createQuestion.dto';
import { QuestionFilterDto } from './dto/questionFilter.dto';
import { UpdateQuestionDto } from './dto/updateQuestion.dto';
import { IQuestionsService } from './interface/questions.service.interface';

@Injectable()
export class QuestionsService implements IQuestionsService{

    constructor(
        @InjectRepository(Questions) private readonly questionRepository: Repository<Questions>,
        @Inject('IOptionsService')
        private readonly optionService : IOptionsService
    ) {}
    
    public async findOne(id: number): Promise<Questions> {
        return await this.questionRepository.findOne(id);
    }

    public async get(id : number): Promise<Questions> {
        return await this.questionRepository.createQueryBuilder('q')
            .leftJoinAndSelect('q.options','o')
            .andWhere('q.id =:id', {id: id})
            .getOne();
    }

    public async  getAll(): Promise<Questions[]> {
        return await this.questionRepository.createQueryBuilder('q')
            .leftJoinAndSelect('q.options','o')
            .getMany();
    }

    public async create(dto: CreateQuestionDto): Promise<Questions> {
        try {
            const question = new Questions;
            question.label = dto.Label;
            question.form = dto.Form;
            question.type = dto.Type;
            question.is_required = dto.IsRequired;

            const result = await this.questionRepository.insert(question);
            const newId = result.raw[0].id;
            return await this.questionRepository.findOne(newId);   
        } catch (error) {
            throw new Error(error.message);
        }
        
    }

    public async edit(dto: UpdateQuestionDto): Promise<Questions> {
        try {
            const editedQuestion = dto.Question;
            editedQuestion.label = dto.Label;
            editedQuestion.is_required = dto.IsRequired;
            editedQuestion.type = dto.Type;

            await this.questionRepository.save(editedQuestion);
            return editedQuestion;
        } catch (error) {
            throw new Error(error.message);
        }
       
    }

    public async delete(id: number): Promise<boolean> {
        try {
            const question = await this.get(id);
            if (!question) {
                throw new Error('The form not found');
            }
            if (question.options && question.options.length>0) {
                for (const option of question.options) {
                    await this.optionService.delete(option.id);
                }
            }
            await this.questionRepository.delete(id);
            return true;
        } catch (error) {
            throw new Error(error.message);
        }
       
    }

}
