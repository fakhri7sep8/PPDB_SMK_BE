import { Test, TestingModule } from '@nestjs/testing';
import { CalonsiswaService } from './calonsiswa.service';

describe('CalonsiswaService', () => {
  let service: CalonsiswaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CalonsiswaService],
    }).compile();

    service = module.get<CalonsiswaService>(CalonsiswaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
