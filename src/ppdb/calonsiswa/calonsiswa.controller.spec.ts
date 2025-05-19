import { Test, TestingModule } from '@nestjs/testing';
import { CalonsiswaController } from './calonsiswa.controller';

describe('CalonsiswaController', () => {
  let controller: CalonsiswaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CalonsiswaController],
    }).compile();

    controller = module.get<CalonsiswaController>(CalonsiswaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
