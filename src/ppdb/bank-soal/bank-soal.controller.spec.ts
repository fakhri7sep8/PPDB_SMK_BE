import { Test, TestingModule } from '@nestjs/testing';
import { BankSoalController } from './bank-soal.controller';

describe('BankSoalController', () => {
  let controller: BankSoalController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BankSoalController],
    }).compile();

    controller = module.get<BankSoalController>(BankSoalController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
