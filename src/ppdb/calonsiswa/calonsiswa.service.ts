import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
    @InjectRepository(CalonSiswa)
    private readonly calonSiswa: Repository<CalonSiswa>,
  ) {
    super();
  }

  async getAllCalonSiswa(): Promise<ResponseSuccess> {
    const calonSiswa = await this.calonSiswa.find();
    const count = await this.calonSiswa.count();
    return this.success('Data ditemukan', {
      calonSiswa: calonSiswa,
      count: count,
    });
  }

  async createCalonSiswa(
    payload: CreateCalonSiswaDto,
    userId: number,
  ): Promise<ResponseSuccess> {
    const entity = this.calonSiswa.create({
      ...payload,
      user: { id: userId },
    });

    const calonSiswa = await this.calonSiswa.save(entity);

    return this.success('Berhasil daftar', calonSiswa);
  }

  async getDetail(id: number) {
    const siswa = await this.calonSiswa.findOne({ where: { id } });

    if (!siswa) {
      throw new NotFoundException('Calon siswa tidak ditemukan');
    }

    return {
      message: 'OK',
      siswa,
    };
  }

  async updateStatus(id: number, status: string) {
    const siswa = await this.calonSiswa.findOneBy({ id });

    if (!siswa) {
      throw new NotFoundException('Siswa tidak ditemukan');
    }

    siswa.status = status;
    return this.calonSiswa.save(siswa);
  }
}
