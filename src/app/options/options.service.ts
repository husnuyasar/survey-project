import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Options } from 'src/entities/options.entity';
import { Repository } from 'typeorm';
import { CreateOptionDto } from './dto/createOption.dto';
import { UpdateOptionDto } from './dto/updateOption.dto';
import { IOptionsService } from './interface/options.service.interface';

@Injectable()
export class OptionsService implements IOptionsService {

    constructor(
        @InjectRepository(Options) private readonly optionRepository: Repository<Options>
    ) {}

    public async findOne(id: number): Promise<Options> {
        return await this.optionRepository.findOne(id);
    }

    public async getAll(): Promise<Options []> {
        return await this.optionRepository.find()
    }
    
    public async create(dto: CreateOptionDto): Promise<Options> {
        try {
            const option = new Options;
            option.label = dto.Label;
            option.question = dto.Question;

            const result = await this.optionRepository.insert(option);
            const newId = result.raw[0].id;
            return await this.optionRepository.findOne(newId);   
        } catch (error) {
            throw new Error(error.message);    
        }
        
    }

    public async edit(dto: UpdateOptionDto): Promise<Options> {
        try {
            const editedOption = dto.Option;
            editedOption.label = dto.Label;

            await this.optionRepository.save(editedOption);
            return editedOption;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    public async delete(id: number): Promise<boolean> {
        try {
            const option = await this.findOne(id);
            if (!option) {
                throw new Error('The Option not found');
            }
            await this.optionRepository.delete(id);
            return true;
        } catch (error) {
            throw new Error('Method not implemented.');    
        }
        
    }
}
