import { Test, TestingModule } from '@nestjs/testing';
import { UserJawabanService } from './user-jawaban.service';

describe('UserJawabanService', () => {
  let service: UserJawabanService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserJawabanService],
    }).compile();

    service = module.get<UserJawabanService>(UserJawabanService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
