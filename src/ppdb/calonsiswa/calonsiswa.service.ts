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
import { CreateCalonSiswaDto, UpdateCalonSiswa } from './calonsiswa.dto';
import { Berkas } from '../entity/berkas.entity';

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
    const siswa = await this.calonSiswa.findOne({ where: { id } , relations : ['berkas'] });

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

  async updateCalonSiswa(id:number, payload:UpdateCalonSiswa):Promise<ResponseSuccess> {
    try{
      const calonSiswa = await this.calonSiswa.findOneBy({ id: id });
      if (!calonSiswa) {
        throw new HttpException('Data tidak ditemukan', HttpStatus.NOT_FOUND);
      }
      await this.calonSiswa.update(id, payload);
      return this.success('Data berhasil diupdate', payload);
    }catch(e){
      console.log(e);
      throw new HttpException('Ada Kesalahan', HttpStatus.BAD_REQUEST);
    }
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
