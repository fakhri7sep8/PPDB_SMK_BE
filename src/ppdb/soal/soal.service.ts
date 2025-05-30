import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResponseSuccess } from 'src/interface/response.interface';
import { Soal } from 'src/ppdb/entity/soal.entity';
import BaseResponse from 'src/utils/response.utils';
import { Repository } from 'typeorm';
import { OpsiJawaban } from '../entity/opsiJawaban.entity';

@Injectable()
export class SoalService extends BaseResponse {
  constructor(
    @InjectRepository(Soal)
    private soalRepository: Repository<Soal>,
    @InjectRepository(OpsiJawaban) private opsiJawabanRepository: Repository<OpsiJawaban>,
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

  async updateSoal(id: string, data: Partial<Soal>): Promise<ResponseSuccess> {
  const soal = await this.soalRepository.findOne({
    where: { id: +id },
    relations: ['opsiJawaban'],
  });

  if (!soal) throw new NotFoundException('Soal tidak ditemukan');

  // Update field biasa
  soal.pertanyaan = data.pertanyaan ?? soal.pertanyaan;
  soal.kategori_pelajaran = data.kategori_pelajaran ?? soal.kategori_pelajaran;

  // Kalau opsiJawaban dikirim, update manual
  if (data.opsiJawaban && Array.isArray(data.opsiJawaban)) {
    // Hapus semua opsi lama dulu
    await this.opsiJawabanRepository.delete({ soal: { id: +id } });

    // Masukin opsi baru, hubungkan ke soal
    soal.opsiJawaban = data.opsiJawaban.map((opsi) =>
      this.opsiJawabanRepository.create({
        ...opsi,
        soal, // ini penting buat connect relasinya
      }),
    );
  }

  const saved = await this.soalRepository.save(soal);
  return this.success('Berhasil Mengupdate Soal', saved);
}

  async findById(id: string): Promise<ResponseSuccess> {
    const find = await this.soalRepository.findOne({
      where: { id: +id },
      relations: ['opsiJawaban'],
    });
    return this.success("Berhasil mengambil data soal", find);
  }

}
