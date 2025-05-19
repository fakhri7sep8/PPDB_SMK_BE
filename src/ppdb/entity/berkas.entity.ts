import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { CalonSiswa } from './calon-siswa.entity';

@Entity('berkas')
export class Berkas {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => CalonSiswa, (calon) => calon.berkas)
  @JoinColumn({ name: 'calon_siswa_id' })
  calonSiswa: CalonSiswa;

  @Column()
  jenis_berkas: string;

  @Column()
  file_path: string;

  @CreateDateColumn()
  uploaded_at: Date;

  @Column()
  status: string;

  @Column({ nullable: true })
  keterangan: string;
}
