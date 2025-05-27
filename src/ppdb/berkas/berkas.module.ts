import { Module } from '@nestjs/common';
import { BerkasController } from './berkas.controller';
import { BerkasService } from './berkas.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Berkas } from 'src/ppdb/entity/berkas.entity';
import { CalonSiswa } from 'src/ppdb/entity/calon-siswa.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Berkas, CalonSiswa])],
  controllers: [BerkasController],
  providers: [BerkasService]
})
export class BerkasModule {}
