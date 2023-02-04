import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Forms } from 'src/entities/forms.entity';
import { Repository } from 'typeorm';
import { IQuestionsService } from '../questions/interface/questions.service.interface';
import { CreateFormDto } from './dto/createForm.dto';
import { UpdateFormDto } from './dto/updateForm.dto';
import { IFormsService } from './interface/forms.service.interface';

@Injectable()
export class FormsService implements IFormsService {
    constructor(
        @InjectRepository(Forms) private readonly formRepository: Repository<Forms>,
        @Inject('IQuestionsService')
        private readonly questionService : IQuestionsService
    ) {}    
    
    public async findOne(id: number): Promise<Forms> {
        return await this.formRepository.findOne(id);
    }
        
    public async get(id: number): Promise<Forms> {
        try {
            return await this.formRepository.createQueryBuilder('f')
                .leftJoinAndSelect('f.questions','q')
                .leftJoinAndSelect('q.options','o')
                .where('f.id =:id', {id: id})
                .getOne();    
        } catch (error) {
            throw new Error(error.message);
        }
        
    }

    public async getAll(): Promise<Forms[]> {
        try {
            return await this.formRepository.createQueryBuilder('f')
                .leftJoinAndSelect('f.questions','q')
                .leftJoinAndSelect('q.options','o')
                .getMany();
        } catch (error) {
            throw new Error(error.message);
        }
    }

    public async create(dto: CreateFormDto): Promise<Forms> {
        try {
            const form = new Forms;
            form.label = dto.Label;
    
            const result = await this.formRepository.insert(form);
            const newId = result.raw[0].id;
            return await this.formRepository.findOne(newId);   
        } catch (error) {
            throw new Error(error.message);
        }
    }

    public async edit(dto: UpdateFormDto): Promise<Forms> {
        try {
            const editForm = dto.Form;
            editForm.label = dto.Label;
            await this.formRepository.save(editForm);

            return editForm;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    public async delete(id: number): Promise<boolean> {
        const form = await this.get(id);
        if(!form)
            throw new Error('The form not found');
        if(form.questions && form.questions.length>0) {
            for (const question of form.questions) {
                await this.questionService.delete(question.id)
            }
        }
        await this.formRepository.delete(id);
        return true;
    }
}
