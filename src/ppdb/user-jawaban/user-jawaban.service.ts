import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserJawaban } from '../entity/userJawaban.entity';
import { Soal } from '../entity/soal.entity';
import { OpsiJawaban } from '../entity/opsiJawaban.entity';
import { CreateUserJawabanDto } from './user-jawaban.dto';


@Injectable()
export class UserJawabanService {
  constructor(
    @InjectRepository(UserJawaban)
    private ujRepo: Repository<UserJawaban>,
    @InjectRepository(Soal)
    private soalRepo: Repository<Soal>,
    @InjectRepository(OpsiJawaban)
    private opsiRepo: Repository<OpsiJawaban>,
  ) {}

async submitJawaban(dto: CreateUserJawabanDto): Promise<UserJawaban> {
  const soal = await this.soalRepo.findOne({
    where: { id: dto.id_soal },
    relations: ['opsiJawaban'],
  });

  if (!soal) {
    throw new Error('Soal tidak ditemukan');
  }

  const jawabanBenar = soal.opsiJawaban.find(
    (opsi) => opsi.is_benar && opsi.kode === dto.jawaban,
  );

  const benar = !!jawabanBenar;
  const skor = benar ? 10 : 0;

  const uj = this.ujRepo.create({
    id_user: dto.id_user,
    soal,
    jawaban: dto.jawaban,
    benar,
    skor,
  });

  return await this.ujRepo.save(uj);
}

  findByUser(id_user: number) {
    return this.ujRepo.find({
      where: { id_user },
      relations: ['soal'],
    });
  }
}
