import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { QuestionsController } from './questions.controller';
import { IQuestionsService } from "./interface/questions.service.interface";
import { TypeOrmModule } from '@nestjs/typeorm';
import { Questions } from 'src/entities/questions.entity';
import { CreateQuestionMiddleware } from './middleware/createQuestion.middleware';
import { FormsService } from '../forms/forms.service';
import { IFormsService } from '../forms/interface/forms.service.interface';
import { Forms } from 'src/entities/forms.entity';
import { UpdateQuestionMiddleware } from './middleware/updateQuestion.middleware';
import { OptionsService } from '../options/options.service';
import { IOptionsService } from '../options/interface/options.service.interface';
import { Options } from 'src/entities/options.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Questions, Forms, Options])
  ],
  providers: [
    {
      provide: 'IQuestionsService',
      useClass: QuestionsService
    },
    {
      provide :'IFormsService',
      useClass: FormsService
    },
    {
      provide: 'IOptionsService',
      useClass: OptionsService
    }
  ],
  controllers: [QuestionsController]
})
export class QuestionsModule implements NestModule {
  configure(consumer : MiddlewareConsumer) {
    consumer
      .apply(CreateQuestionMiddleware)
      .forRoutes(
        {path: 'questions', method: RequestMethod.POST}
      )
      .apply(UpdateQuestionMiddleware)
      .forRoutes(
        {path: 'questions/:id', method: RequestMethod.PUT}
      )
  }
}
