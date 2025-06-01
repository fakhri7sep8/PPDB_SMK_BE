import { Controller, Get, Query, Post, Body, Delete, Param, Put } from '@nestjs/common';
import { SoalService } from './soal.service';
import { Soal } from 'src/ppdb/entity/soal.entity';

@Controller('soal')
export class SoalController {
  constructor(private readonly soalService: SoalService) {}

  @Get()
  async getSoal(@Query('kategori') kategori?: string) {
    if (kategori) return this.soalService.findByKategori(kategori);
    return this.soalService.findAll();
  }

  @Post('create')
  createSoal(@Body() soal: Partial<Soal>){
    return this.soalService.create(soal);
  }

  @Put('update/:id')
  updateSoal(@Param('id') id: string, @Body() soal: Partial<Soal>) {
    return this.soalService.updateSoal(id, soal);
  }
  
  @Delete('delete')
  deleteSoal(@Query('id') id: string) {
    return this.soalService.deleteSoal(id);
  }

  @Get('/:id')
  findById(@Param('id') id: string) {
    return this.soalService.findById(id);
  }

  
}
