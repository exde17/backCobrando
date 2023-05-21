import { Test, TestingModule } from '@nestjs/testing';
import { AbonosService } from './abonos.service';

describe('AbonosService', () => {
  let service: AbonosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AbonosService],
    }).compile();

    service = module.get<AbonosService>(AbonosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
