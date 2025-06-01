import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { CalonSiswa } from './calon-siswa.entity';

@Entity()
export class NilaiKategori {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => CalonSiswa, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_calon_siswa' })
  calonSiswa: CalonSiswa;

  @Column()
  kategori_pelajaran: string;

  @Column('float')
  nilai: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
