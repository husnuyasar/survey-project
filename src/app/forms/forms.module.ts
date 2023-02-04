import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { FormsService } from './forms.service';
import { FormsController } from './forms.controller';
import { IFormsService } from "./interface/forms.service.interface";
import { TypeOrmModule } from '@nestjs/typeorm';
import { Forms } from 'src/entities/forms.entity';
import { CreateFormMiddleware } from './middleware/createForm.middleware';
import { UpdateFormMiddleware } from './middleware/updateForm.middleware';
import { Questions } from 'src/entities/questions.entity';
import { Options } from 'src/entities/options.entity';
import { QuestionsService } from '../questions/questions.service';
import { IQuestionsService } from '../questions/interface/questions.service.interface';
import { OptionsService } from '../options/options.service';
import { IOptionsService } from '../options/interface/options.service.interface';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Forms,
      Questions,
      Options
    ])
  ],
  providers: [
    {
      provide :'IFormsService',
      useClass: FormsService
    },
    {
      provide :'IQuestionsService',
      useClass: QuestionsService
    },
    {
      provide :'IOptionsService',
      useClass: OptionsService
    }
  ],
  controllers: [FormsController],
  exports: [
    {
      provide :'IFormsService',
      useClass: FormsService
    },
  ]
})
export class FormsModule implements NestModule {
  configure(consumer : MiddlewareConsumer) {
    consumer
      .apply(CreateFormMiddleware)
      .forRoutes(
        {path: 'forms', method: RequestMethod.POST}
      )
      .apply(UpdateFormMiddleware)
      .forRoutes(
        {path: 'forms/:id', method: RequestMethod.PUT}
      )
  }
}
