import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { OptionsService } from './options.service';
import { OptionsController } from './options.controller';
import { IOptionsService } from "./interface/options.service.interface";
import { TypeOrmModule } from '@nestjs/typeorm';
import { Options } from 'src/entities/options.entity';
import { Questions } from 'src/entities/questions.entity';
import { QuestionsService } from '../questions/questions.service';
import { IQuestionsService } from '../questions/interface/questions.service.interface';
import { CreateOptionMiddleware } from './middleware/createOption.middleware';
import { UpdateOptionMiddleware } from './middleware/updateOption.middleware';

@Module({
  imports: [
    TypeOrmModule.forFeature([Options, Questions])
  ],
  providers: [
    {
      provide: 'IOptionsService',
      useClass: OptionsService
    },
    {
      provide: 'IQuestionsService',
      useClass: QuestionsService
    }
  ],
  controllers: [OptionsController]
})
export class OptionsModule implements NestModule {
  configure(consumer : MiddlewareConsumer) {
    consumer
      .apply(CreateOptionMiddleware)
      .forRoutes(
        {path: 'options', method: RequestMethod.POST}
      )
      .apply(UpdateOptionMiddleware)
      .forRoutes(
        {path: 'options/:id', method: RequestMethod.PUT}
      )
  }
}
