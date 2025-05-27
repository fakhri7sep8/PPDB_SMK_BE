import { Module } from '@nestjs/common';
import { UserJawabanService } from './user-jawaban.service';
import { UserJawabanController } from './user-jawaban.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserJawaban } from '../entity/userJawaban.entity';
import { OpsiJawaban } from '../entity/opsiJawaban.entity';
import { Soal } from '../entity/soal.entity';

@Module({
  imports : [TypeOrmModule.forFeature([UserJawaban,OpsiJawaban,Soal])],
  providers: [UserJawabanService],
  controllers: [UserJawabanController]
})
export class UserJawabanModule {}
