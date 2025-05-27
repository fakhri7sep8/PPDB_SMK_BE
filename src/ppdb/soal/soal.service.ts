import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Soal } from 'src/ppdb/entity/soal.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SoalService {
  constructor(
    @InjectRepository(Soal)
    private soalRepository: Repository<Soal>,
  ) {}

  findAll(): Promise<Soal[]> {
    return this.soalRepository.find({ relations: ['opsiJawaban'] });
  }

  findByKategori(kategori: string): Promise<Soal[]> {
    return this.soalRepository.find({
      where: { kategori_pelajaran: kategori },
      relations: ['opsiJawaban'],
    });
  }

  create(soal: Partial<Soal>): Promise<Soal> {
    const newSoal = this.soalRepository.create(soal);
    return this.soalRepository.save(newSoal);
  }
}
