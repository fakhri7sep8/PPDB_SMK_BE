import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Soal } from './soal.entity';

@Entity()
export class OpsiJawaban {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Soal, (soal) => soal.opsiJawaban, { onDelete: 'CASCADE' })
  soal: Soal;

  @Column()
  isi: string;

  @Column({ length: 1 })
  kode: string; // A, B, C, D

  @Column({ default: false })
  is_benar: boolean;
}
