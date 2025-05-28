import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResponseSuccess } from 'src/interface/response.interface';
import { Soal } from 'src/ppdb/entity/soal.entity';
import BaseResponse from 'src/utils/response.utils';
import { Repository } from 'typeorm';

@Injectable()
export class SoalService extends BaseResponse {
  constructor(
    @InjectRepository(Soal)
    private soalRepository: Repository<Soal>,
  ) {
    super()
  }

  async findAll(): Promise<ResponseSuccess> {
    const find = await this.soalRepository.find({ relations: ['opsiJawaban'] });
    return this.success("Berhasil mengambil data soal", find);
  }

  async findByKategori(kategori: string): Promise<ResponseSuccess> {
    const find = await this.soalRepository.find({
      where: { kategori_pelajaran: kategori },
      relations: ['opsiJawaban'],
    });
    if(find.length == 0){
      throw new HttpException('Data tidak ditemukan', HttpStatus.NOT_FOUND);
    }
    return this.success("Berhasil mengambil data soal berdasarkan kategori", find);
  }

  async create(soal: Partial<Soal>): Promise<ResponseSuccess> {
    const newSoal = await this.soalRepository.save(soal);
    return this.success("Berhasi Membuat Soal", newSoal);
  }

  async deleteSoal(id:string){
    const hapus = await this.soalRepository.delete({id: +id});
    return this.success("Berhasil Menghapus Soal", hapus);
  }
}
