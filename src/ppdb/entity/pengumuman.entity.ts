import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('pengumuman')
export class Pengumuman {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  judul: string;

  @Column('text')
  isi: string;

  @Column({ default: true })
  tampilkan: boolean;

  @CreateDateColumn()
  created_at: Date;
}
