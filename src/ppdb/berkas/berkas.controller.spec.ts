import { Test, TestingModule } from '@nestjs/testing';
import { BerkasController } from './berkas.controller';

describe('BerkasController', () => {
  let controller: BerkasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BerkasController],
    }).compile();

    controller = module.get<BerkasController>(BerkasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
