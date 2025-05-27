import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { OpsiJawaban } from './opsiJawaban.entity';

@Entity()
export class Soal {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  pertanyaan: string;

  @Column()
  kategori_pelajaran: string;

  @OneToMany(() => OpsiJawaban, (opsiJawaban) => opsiJawaban.soal, { cascade: true })
  opsiJawaban: OpsiJawaban[];
}
