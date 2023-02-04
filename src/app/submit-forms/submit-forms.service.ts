import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SubmitForms } from 'src/entities/submitForms.entity';
import { SubmitOptions } from 'src/entities/submitOptions.entity';
import { SubmitQuestions } from 'src/entities/submitQuestions.entity';
import { Repository } from 'typeorm';
import { IOptionsService } from '../options/interface/options.service.interface';
import { UserType } from '../users/enum/userType.enum';
import { CreateSubmitFormDto } from './dto/createSubmitForm.dto';
import { CreateSubmitQuestionDto } from './dto/createSubmitQuestion.dto';
import { SubmitFormFilterDto } from './dto/submitFormFilter.dto';
import { ISubmitFormsService } from './interface/submit-forms.service.interface';

@Injectable()
export class SubmitFormsService implements ISubmitFormsService{

    constructor(
        @InjectRepository(SubmitForms) private readonly submitFormRepository: Repository<SubmitForms>,
        @InjectRepository(SubmitQuestions) private readonly submitQuestionRepository: Repository<SubmitQuestions>,
        @InjectRepository(SubmitOptions) private readonly submitOptionRepository: Repository<SubmitOptions>,
        @Inject('IOptionsService')
        private readonly optionService : IOptionsService
    ) 
    {}
    
    public async get(id: number): Promise<SubmitForms> {
        return await this.submitFormRepository.createQueryBuilder('sf')
            .innerJoinAndSelect('sf.User','u')
            .innerJoinAndSelect('sf.Form','f')
                .leftJoinAndSelect('sf.SubmitQuestions','sq')
                    .leftJoinAndSelect('sq.Question','q')
                    .leftJoinAndSelect('sq.SubmitOptions','so')
                        .leftJoinAndSelect('so.Option','o')
            .where('sf.id =:id',{id: id})
            .getOne();
    }

    public async getAll(filter: SubmitFormFilterDto): Promise<SubmitForms[]> {
        const submits = await this.submitFormRepository.createQueryBuilder('sf')
            .innerJoinAndSelect('sf.User','u')
            .innerJoinAndSelect('sf.Form','f')
                .leftJoinAndSelect('sf.SubmitQuestions','sq')
                    .leftJoinAndSelect('sq.Question','q')
                    .leftJoinAndSelect('sq.SubmitOptions','so')
                        .leftJoinAndSelect('so.Option','o')
        if (filter.Role == UserType.User) {
            submits.andWhere('u.id =:userId', {userId : filter.UserId})
        }
        return await submits.getMany();
    }

    public async create(dto: CreateSubmitFormDto): Promise<SubmitForms> {
        try {
            const submitForm = new SubmitForms;
            submitForm.User =dto.User;
            submitForm.Form = dto.Form;

            const result = await this.submitFormRepository.insert(submitForm);
            const newId = result.raw[0].id;
            const newSubmitForm = await this.submitFormRepository.findOne(newId);   

            if (dto.QuestionSelections && dto.QuestionSelections.length>0) {
                for (const questionSelection of dto.QuestionSelections) {
                    const createQuestionDto = new CreateSubmitQuestionDto;
                    createQuestionDto.QuestionSelections = questionSelection
                    createQuestionDto.SubmitForm = newSubmitForm;
                    await this.createSubmitQuestionAndOptions(createQuestionDto)
                }
            }

            return await this.get(newSubmitForm.id);
        } catch (error) {
            throw new Error(error.message);
        }
        
    }

    protected async createSubmitQuestionAndOptions(dto : CreateSubmitQuestionDto) {
        try {
            const submitQuestion = new SubmitQuestions;
            submitQuestion.Question = dto.QuestionSelections.Question;
            submitQuestion.SubmitForm = dto.SubmitForm;
            const result = await this.submitQuestionRepository.insert(submitQuestion);
            const newId = result.raw[0].id;
            const newSubmitQuestion = await this.submitQuestionRepository.findOne(newId);   
            if (dto.QuestionSelections.Selections && dto.QuestionSelections.Selections.length>0) {
                for (const selectedOptionId of dto.QuestionSelections.Selections) {
                    const option = await this.optionService.findOne(selectedOptionId);
                    const submitOption = new SubmitOptions;
                    submitOption.Option = option;
                    submitOption.SubmitQuestion = newSubmitQuestion;
                    await this.submitOptionRepository.insert(submitOption)
                }
            }

        } catch (error) {
            throw new Error(error.message);
        }
    }
}
