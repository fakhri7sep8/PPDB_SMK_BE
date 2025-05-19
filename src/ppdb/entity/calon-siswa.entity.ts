import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn,
  ManyToOne, OneToMany, JoinColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Pendaftaran } from './pendaftaran.entity';
import { Berkas } from './berkas.entity';
@Entity('calon_siswa')
export class CalonSiswa {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.calonSiswa)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({type: 'varchar', length: 255})
  nama_lengkap: string;

  @Column()
  nik: string;

  @Column()
  nisn: string;

  @Column()
  jenis_kelamin: string;

  @Column()
  tempat_lahir: string;

  @Column()
  tanggal_lahir: string;

  @Column()
  alamat: string;

  @Column()
  asal_sekolah: string;

  @Column()
  no_hp: string;

  @Column()
  email: string;

  @Column()
  tahun_ajaran: string;

  @CreateDateColumn()
  created_at: Date;

  @OneToMany(() => Pendaftaran, (p) => p.calonSiswa)
  pendaftarans: Pendaftaran[];

  @OneToMany(() => Berkas, (b) => b.calonSiswa)
  berkas: Berkas[];
}
