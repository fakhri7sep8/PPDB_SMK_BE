import { Module } from '@nestjs/common';
import { SoalService } from './soal.service';
import { SoalController } from './soal.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Soal } from 'src/ppdb/entity/soal.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Soal])],
  providers: [SoalService],
  controllers: [SoalController]
})
export class SoalModule {}
