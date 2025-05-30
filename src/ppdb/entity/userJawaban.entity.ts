import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Soal } from './soal.entity';
import { User } from './user.entity'
import { CalonSiswa } from './calon-siswa.entity';

@Entity()
export class UserJawaban {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_user' })
  user: User;

  @ManyToOne(() => CalonSiswa, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_calon_siswa' }) // 👈 tambahkan kolom ini
  calonSiswa: CalonSiswa;

  @ManyToOne(() => Soal, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_soal' })
  soal: Soal;

  @Column()
  jawaban: string;

  @Column()
  benar: boolean;

  @Column()
  skor: number;
}
