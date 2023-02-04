import { Test, TestingModule } from '@nestjs/testing';
import { SubmitFormsController } from './submit-forms.controller';

describe('SubmitFormsController', () => {
  let controller: SubmitFormsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubmitFormsController],
    }).compile();

    controller = module.get<SubmitFormsController>(SubmitFormsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
