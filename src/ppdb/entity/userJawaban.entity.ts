import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Soal } from './soal.entity';

@Entity()
export class UserJawaban {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  id_user: number; // Bisa relasi ke user entity jika ada

  @ManyToOne(() => Soal, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_soal' })
  soal: Soal;

  @Column()
  jawaban: string; // Misal: 'A', 'B', dll

  @Column()
  benar: boolean;

  @Column('int')
  skor: number;
}