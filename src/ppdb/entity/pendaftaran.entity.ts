import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { CalonSiswa } from './calon-siswa.entity';

@Entity('pendaftaran')
export class Pendaftaran {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => CalonSiswa, (calon) => calon.pendaftarans)
  @JoinColumn({ name: 'calon_siswa_id' })
  calonSiswa: CalonSiswa;

  @Column()
  jalur_pendaftaran: string;

  @Column()
  no_pendaftaran: string;

  @Column({ type: 'date' })
  tanggal_daftar: Date;

  @Column()
  status: string;

  @Column({ nullable: true })
  catatan: string;
}
