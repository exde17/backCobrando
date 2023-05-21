import { Test, TestingModule } from '@nestjs/testing';
import { CobradorService } from './cobrador.service';

describe('CobradorService', () => {
  let service: CobradorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CobradorService],
    }).compile();

    service = module.get<CobradorService>(CobradorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
