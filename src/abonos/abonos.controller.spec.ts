import { Test, TestingModule } from '@nestjs/testing';
import { AbonosController } from './abonos.controller';
import { AbonosService } from './abonos.service';

describe('AbonosController', () => {
  let controller: AbonosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AbonosController],
      providers: [AbonosService],
    }).compile();

    controller = module.get<AbonosController>(AbonosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
