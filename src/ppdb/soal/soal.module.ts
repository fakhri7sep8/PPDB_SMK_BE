import { Module } from '@nestjs/common';
import { SoalService } from './soal.service';
import { SoalController } from './soal.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Soal } from 'src/ppdb/entity/soal.entity';
import { OpsiJawaban } from '../entity/opsiJawaban.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Soal, OpsiJawaban])],
  providers: [SoalService],
  controllers: [SoalController]
})
export class SoalModule {}
