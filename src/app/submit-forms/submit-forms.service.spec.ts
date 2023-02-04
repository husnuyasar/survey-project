import { Test, TestingModule } from '@nestjs/testing';
import { SubmitFormsService } from './submit-forms.service';

describe('SubmitFormsService', () => {
  let service: SubmitFormsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubmitFormsService],
    }).compile();

    service = module.get<SubmitFormsService>(SubmitFormsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
