import { Test, TestingModule } from '@nestjs/testing';
import { BankSoalService } from './bank-soal.service';

describe('BankSoalService', () => {
  let service: BankSoalService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BankSoalService],
    }).compile();

    service = module.get<BankSoalService>(BankSoalService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
