import { Controller, Get, Query, Post, Body } from '@nestjs/common';
import { SoalService } from './soal.service';
import { Soal } from 'src/ppdb/entity/soal.entity';

@Controller('soal')
export class SoalController {
  constructor(private readonly soalService: SoalService) {}

  @Get()
  getSoal(@Query('kategori') kategori?: string): Promise<Soal[]> {
    if (kategori) return this.soalService.findByKategori(kategori);
    return this.soalService.findAll();
  }

  @Post()
  createSoal(@Body() soal: Partial<Soal>): Promise<Soal> {
    return this.soalService.create(soal);
  }
}
