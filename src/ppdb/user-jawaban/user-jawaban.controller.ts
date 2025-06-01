import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  UseGuards,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { UserJawabanService } from './user-jawaban.service';
import { CreateUserJawabanDto } from './user-jawaban.dto';
import { JwtGuard } from '../auth/auth.guard';
import { NilaiKategori } from '../entity/nilaiUser.entity';

@Controller('user-jawaban')
export class UserJawabanController {
  constructor(private readonly ujService: UserJawabanService) {}

  @UseGuards(JwtGuard)
  @Post()
  submit(@Body() dto: CreateUserJawabanDto) {
    return this.ujService.submitJawaban(dto);
  }

  @UseGuards(JwtGuard)
  @Get()
  findByUser() {
    return this.ujService.findByUser();
  }
  @Get('cek')
  async cekSudahMengerjakan(
    @Query('idCalonSiswa') idCalonSiswa: number,
    @Query('kategori') kategori: string,
  ) {
    const sudah = await this.ujService.sudahMengerjakan(idCalonSiswa, kategori);
    return { sudahMengerjakan: sudah };
  }

  @Get('nilai/:idCalonSiswa')
  findNilaiByCalonSiswa(@Param('idCalonSiswa') id: string) {
    console.log('ID calon siswa (string):', id);
    const idNum = parseInt(id, 10);
    return this.ujService.findNilaiByCalonSiswa(idNum);
  }

  // user-jawaban.controller.ts

@Get('nilai-kategori')
async getAllNilaiKategori() {
  return this.ujService.findAllNilaiKategori();
}

}
