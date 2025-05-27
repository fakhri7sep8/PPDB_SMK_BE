import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Soal } from './soal.entity';

@Entity()
export class UserJawaban {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  id_user: number;

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
