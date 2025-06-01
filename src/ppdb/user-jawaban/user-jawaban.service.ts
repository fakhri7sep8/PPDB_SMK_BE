import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserJawaban } from '../entity/userJawaban.entity';
import { Soal } from '../entity/soal.entity';
import { OpsiJawaban } from '../entity/opsiJawaban.entity';
import { CreateUserJawabanDto } from './user-jawaban.dto';
import { User } from '../entity/user.entity';
import BaseResponse from 'src/utils/response.utils';
import { ResponseSuccess } from 'src/interface/response.interface';
import { CalonSiswa } from '../entity/calon-siswa.entity';
import { NilaiKategori } from '../entity/nilaiUser.entity';

@Injectable()
export class UserJawabanService extends BaseResponse {
  constructor(
    @InjectRepository(CalonSiswa)
    private calonSiswaRepo: Repository<CalonSiswa>,

    @InjectRepository(UserJawaban)
    private ujRepo: Repository<UserJawaban>,
    @InjectRepository(Soal)
    private soalRepo: Repository<Soal>,
    @InjectRepository(OpsiJawaban)
    private opsiRepo: Repository<OpsiJawaban>,
    @InjectRepository(User)
    private userRepo: Repository<User>,
    @InjectRepository(NilaiKategori)
    private readonly nilaiKategoriRepo: Repository<NilaiKategori>, 
    @Inject('REQUEST') private req: any,
  ) {
    super();
  }

  async submitJawaban(dto: CreateUserJawabanDto): Promise<ResponseSuccess> {
    const soal = await this.soalRepo.findOne({
      where: { id: dto.id_soal },
      relations: ['opsiJawaban'],
    });

    if (!soal) {
      throw new Error('Soal tidak ditemukan');
    }

    const user = await this.userRepo.findOne({
      where: { id: this.req.user.id },
    });
    if (!user) {
      throw new Error('User tidak ditemukan');
    }

    const calonSiswa = await this.calonSiswaRepo.findOne({
      where: { id: dto.id_calon_siswa },
    });

    if (!calonSiswa) {
      throw new Error('Calon siswa tidak ditemukan');
    }

    // Hitung jumlah soal kategori soal ini
    const jumlahSoal = await this.soalRepo.count({
      where: { kategori_pelajaran: soal.kategori_pelajaran },
    });

    const totalSkorKategori = 100;
    const skorPerSoal = totalSkorKategori / jumlahSoal;

    const jawabanBenar = soal.opsiJawaban.find(
      (opsi) => opsi.is_benar && opsi.kode === dto.jawaban,
    );

    const benar = !!jawabanBenar;
    const skor = benar ? skorPerSoal : 0;

    const uj = this.ujRepo.create({
      user,
      calonSiswa,
      soal,
      jawaban: dto.jawaban,
      benar,
      skor,
    });

    const save = await this.ujRepo.save(uj);

    // Update nilai kategori otomatis tiap kali submit jawaban
    await this.updateNilaiKategori(calonSiswa.id);

    return this.success('Jawaban berhasil disimpan', save);
  }

  private async updateNilaiKategori(id_calon_siswa: number): Promise<void> {
    const userJawaban = await this.ujRepo.find({
      where: { calonSiswa: { id: id_calon_siswa } },
      relations: ['soal'],
    });

    if (userJawaban.length === 0) {
      return;
    }

    const calonSiswa = await this.calonSiswaRepo.findOneBy({ id: id_calon_siswa });
    if (!calonSiswa) {
      return;
    }

    const grouped = new Map<string, number>();
    for (const jawaban of userJawaban) {
      const kategori = jawaban.soal.kategori_pelajaran;
      const skor = jawaban.skor || 0;

      if (!grouped.has(kategori)) {
        grouped.set(kategori, 0);
      }
      grouped.set(kategori, grouped.get(kategori)! + skor);
    }

    for (const [kategori, totalSkor] of grouped) {
      let nilaiKategori = await this.nilaiKategoriRepo.findOne({
        where: {
          calonSiswa: { id: id_calon_siswa },
          kategori_pelajaran: kategori,
        },
      });

      if (!nilaiKategori) {
        nilaiKategori = this.nilaiKategoriRepo.create({
          calonSiswa,
          kategori_pelajaran: kategori,
        });
      }

      nilaiKategori.nilai = parseFloat(totalSkor.toFixed(2));
      await this.nilaiKategoriRepo.save(nilaiKategori);
    }
  }

  async findByUser(): Promise<ResponseSuccess> {
    const user = await this.userRepo.findOne({
      where: { id: this.req.user.id },
    });
    if (!user) {
      throw new Error('User tidak ditemukan');
    }
    const find = await this.ujRepo.find({
      where: { user: { id: this.req.user.id } },
      relations: ['soal'],
    });

    return this.success('Data jawaban ditemukan', find);
  }

  async findNilaiByCalonSiswa(id_calon_siswa: number): Promise<ResponseSuccess> {
  const nilai = await this.nilaiKategoriRepo.find({
    where: { calonSiswa: { id: id_calon_siswa } },
    relations: ['calonSiswa'],
  });

  return this.success('Nilai ditemukan', nilai);
}

  async sudahMengerjakan(idCalonSiswa: number, kategori: string): Promise<boolean> {
    const count = await this.ujRepo
      .createQueryBuilder('userJawaban')
      .innerJoin('userJawaban.calonSiswa', 'calonSiswa')
      .innerJoin('userJawaban.soal', 'soal')
      .where('calonSiswa.id = :idCalonSiswa', { idCalonSiswa })
      .andWhere('soal.kategori_pelajaran = :kategori', { kategori })
      .getCount();

    return count > 0;
  }

  async findAllNilaiKategori(): Promise<ResponseSuccess> {
  const data = await this.nilaiKategoriRepo.find({
    relations: ['calonSiswa'],
    order: { createdAt: 'DESC' },
  });

  return this.success('Semua nilai kategori berhasil diambil', data);
}

}
