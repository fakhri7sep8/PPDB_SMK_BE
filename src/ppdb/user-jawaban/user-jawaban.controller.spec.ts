import { Test, TestingModule } from '@nestjs/testing';
import { UserJawabanController } from './user-jawaban.controller';

describe('UserJawabanController', () => {
  let controller: UserJawabanController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserJawabanController],
    }).compile();

    controller = module.get<UserJawabanController>(UserJawabanController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
