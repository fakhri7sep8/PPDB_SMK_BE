import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import BaseResponse from 'src/utils/response.utils';
import { CreateBankSoalDto } from './bank-soal.dto';
import { ResponseSuccess } from 'src/interface/response.interface';
import { BankSoal } from '../entity/bank-soal.entity';

@Injectable()
export class BankSoalService extends BaseResponse {
  constructor(
    @InjectRepository(BankSoal)
    private readonly bankSoalRepo: Repository<BankSoal>,
  ) {
    super();
  }

  async create(dto: CreateBankSoalDto): Promise<ResponseSuccess> {
    const soal = this.bankSoalRepo.create(dto);
    const result = await this.bankSoalRepo.save(soal);
    return this.success('Soal berhasil dibuat', result);
  }

  async findAll(): Promise<ResponseSuccess> {
    const data = await this.bankSoalRepo.find();
    const randomized = data.map((soal) => ({
      ...soal,
      pilihan: this.acakIsiPilihanFixKode(soal.pilihan),
    }));
    return this.success('Berhasil ambil semua soal', randomized);
  }

  async findOne(id: number): Promise<ResponseSuccess> {
    const soal = await this.bankSoalRepo.findOneBy({ id });
    if (!soal) {
      throw new HttpException('Soal tidak ditemukan', HttpStatus.NOT_FOUND);
    }
    return this.success('Soal ditemukan', {
      ...soal,
      pilihan: this.acakIsiPilihanFixKode(soal.pilihan),
    });
  }

  async deleteSoal(id: number): Promise<ResponseSuccess> {
    const soal = await this.bankSoalRepo.findOneBy({ id });
    if (!soal) {
      throw new HttpException('Soal tidak ditemukan', HttpStatus.NOT_FOUND);
    }
    await this.bankSoalRepo.remove(soal);
    return this.success('Soal berhasil dihapus', soal);
  }

  async deleteManySoal(ids: number[]): Promise<ResponseSuccess> {
    const soalList = await this.bankSoalRepo.findByIds(ids);
    if (soalList.length === 0) {
      throw new HttpException('Tidak ada soal yang ditemukan', HttpStatus.NOT_FOUND);
    }
    await this.bankSoalRepo.remove(soalList);
    return this.success(`${soalList.length} soal berhasil dihapus`, soalList);
  }

  // Utility buat acak isi aja, kode tetap A-D
  private acakIsiPilihanFixKode(pilihan: { kode: string; isi: string }[]) {
    const isiShuffled = pilihan.map(p => p.isi).sort(() => Math.random() - 0.5);
    return pilihan.map((p, i) => ({
      kode: p.kode,
      isi: isiShuffled[i],
    }));
  }
}
