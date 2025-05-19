import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import BaseResponse from 'src/utils/response.utils';
import { CalonSiswa } from '../entity/calon-siswa.entity';
import { JwtService } from '@nestjs/jwt';
import { ResponseSuccess } from 'src/interface/response.interface';
import { Repository } from 'typeorm';
import { CreateCalonSiswaDto } from './calonsiswa.dto';

@Injectable()
export class CalonsiswaService extends BaseResponse {
  constructor(
    @InjectRepository(CalonSiswa) private readonly calonSiswa: Repository<CalonSiswa>,
  ) {
    super();
  }

  async getAllCalonSiswa(): Promise<ResponseSuccess> {
    const calonSiswa = await this.calonSiswa.find();
    return this.success('Data ditemukan', calonSiswa);
  }

  async createCalonSiswa(
    payload: CreateCalonSiswaDto,
  ): Promise<ResponseSuccess> {
    const calonSiswa = await this.calonSiswa.save(payload);
    return this.success('Berhasil daftar', calonSiswa);
  }

  async deleteCalonSiswa(id: number): Promise<ResponseSuccess> {
    const calonSiswa = await this.calonSiswa.findOneBy({ id: id });
    if (!calonSiswa) {
      throw new HttpException('Data tidak ditemukan', HttpStatus.NOT_FOUND);
    }
    await this.calonSiswa.remove(calonSiswa);
    return this.success('Data berhasil dihapus', calonSiswa);
  }
}
