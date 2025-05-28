import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Soal } from './soal.entity';
import { User } from './user.entity';

@Entity()
export class UserJawaban {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_user' })
  user: User;


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
