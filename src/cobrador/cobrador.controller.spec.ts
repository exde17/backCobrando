import { Test, TestingModule } from '@nestjs/testing';
import { CobradorController } from './cobrador.controller';
import { CobradorService } from './cobrador.service';

describe('CobradorController', () => {
  let controller: CobradorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CobradorController],
      providers: [CobradorService],
    }).compile();

    controller = module.get<CobradorController>(CobradorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
