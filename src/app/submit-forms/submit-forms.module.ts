import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { SubmitFormsService } from './submit-forms.service';
import { SubmitFormsController } from './submit-forms.controller';
import { ISubmitFormsService } from "./interface/submit-forms.service.interface";
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubmitForms } from 'src/entities/submitForms.entity';
import { SubmitQuestions } from 'src/entities/submitQuestions.entity';
import { SubmitOptions } from 'src/entities/submitOptions.entity';
import { Forms } from 'src/entities/forms.entity';
import { Questions } from 'src/entities/questions.entity';
import { Options } from 'src/entities/options.entity';
import { FormsService } from '../forms/forms.service';
import { IFormsService } from '../forms/interface/forms.service.interface';
import { QuestionsService } from '../questions/questions.service';
import { IQuestionsService } from '../questions/interface/questions.service.interface';
import { OptionsService } from '../options/options.service';
import { IOptionsService } from '../options/interface/options.service.interface';
import { CreateSubmitFormMiddleware } from './middleware/createSubmitForm.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([
    SubmitForms,
    SubmitQuestions,
    SubmitOptions,
    Forms,
    Questions,
    Options
  ])],
  providers: [
    {
      provide: 'ISubmitFormsService',
      useClass: SubmitFormsService
    },
    {
      provide: 'IFormsService',
      useClass: FormsService
    },
    {
      provide: 'IQuestionsService',
      useClass: QuestionsService
    }
    ,
    {
      provide: 'IOptionsService',
      useClass: OptionsService
    }
  ],
  controllers: [SubmitFormsController]
})
export class SubmitFormsModule implements NestModule {
  configure(consumer : MiddlewareConsumer) {
    consumer
      .apply(CreateSubmitFormMiddleware)
      .forRoutes(
        {path: 'submit-forms', method: RequestMethod.POST}
      )
  }
}
