import { Test, TestingModule } from '@nestjs/testing';
import { BerkasService } from './berkas.service';

describe('BerkasService', () => {
  let service: BerkasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BerkasService],
    }).compile();

    service = module.get<BerkasService>(BerkasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
