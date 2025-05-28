import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserJawaban } from '../entity/userJawaban.entity';
import { Soal } from '../entity/soal.entity';
import { OpsiJawaban } from '../entity/opsiJawaban.entity';
import { CreateUserJawabanDto } from './user-jawaban.dto';
import { User } from '../entity/user.entity'; // pastikan path sesuai
import BaseResponse from 'src/utils/response.utils';
import { ResponseSuccess } from 'src/interface/response.interface';

@Injectable()
export class UserJawabanService extends BaseResponse {
  constructor(
    @InjectRepository(UserJawaban)
    private ujRepo: Repository<UserJawaban>,
    @InjectRepository(Soal)
    private soalRepo: Repository<Soal>,
    @InjectRepository(OpsiJawaban)
    private opsiRepo: Repository<OpsiJawaban>,
    @InjectRepository(User)
    private userRepo: Repository<User>,
    @Inject('REQUEST') private req:any
  ) {
    super()
  }

  async submitJawaban(dto: CreateUserJawabanDto): Promise<ResponseSuccess> {
    const soal = await this.soalRepo.findOne({
      where: { id: dto.id_soal },
      relations: ['opsiJawaban'],
    });

    if (!soal) {
      throw new Error('Soal tidak ditemukan');
    }

    const user = await this.userRepo.findOne({ where: { id: this.req.user.id } });
    if (!user) {
      throw new Error('User tidak ditemukan');
    }

    const jawabanBenar = soal.opsiJawaban.find(
      (opsi) => opsi.is_benar && opsi.kode === dto.jawaban,
    );

    const benar = !!jawabanBenar;
    const skor = benar ? 10 : 0;

    const uj = this.ujRepo.create({
      user,
      soal,
      jawaban: dto.jawaban,
      benar,
      skor,
    });
    const save = await this.ujRepo.save(uj);
    return this.success('Jawaban berhasil disimpan', save);
  }

  async findByUser(id_user: number):Promise<ResponseSuccess> {
    const user = await this.userRepo.findOne({ where: { id: this.req.user.id } });
    if (!user) {
      throw new Error('User tidak ditemukan');
    }
    const find = await this.ujRepo.find({
      where: { user: { id: this.req.user.id } },
      relations: ['soal'],
    });

    return this.success('Data jawaban ditemukan', find);
  }
}