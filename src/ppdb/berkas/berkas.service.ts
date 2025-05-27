// berkas.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Berkas } from 'src/ppdb/entity/berkas.entity';
import { CalonSiswa } from 'src/ppdb/entity/calon-siswa.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BerkasService {
  constructor(
    @InjectRepository(Berkas)
    private readonly berkasRepo: Repository<Berkas>,

    @InjectRepository(CalonSiswa)
    private readonly calonSiswaRepo: Repository<CalonSiswa>,
  ) {}

  async simpanBerkasKeDB(data: {
    calonSiswaId: number;
    jenisBerkas: string;
    filePath: string;
    status: string;
    keterangan?: string;
  }) {
    const calon = await this.calonSiswaRepo.findOne({
      where: { id: data.calonSiswaId },
    });

    if (!calon) throw new NotFoundException('Calon siswa tidak ditemukan');

    const berkas = this.berkasRepo.create({
      calonSiswa: calon,
      jenis_berkas: data.jenisBerkas,
      file_path: data.filePath,
      status: data.status,
      keterangan: data.keterangan ?? null,
    });

    return this.berkasRepo.save(berkas);
  }
}
