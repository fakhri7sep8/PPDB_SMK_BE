import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

type PilihanType = {
  kode: string; // "A", "B", etc.
  isi: string;  // isi jawaban, contoh: "4"
};

@Entity('bank_soal')
export class BankSoal {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  pertanyaan: string;

  @Column('json')
  pilihan: PilihanType[];

  @Column()
  jawaban_benar: string;

  @Column({ nullable: true })
  kategori: string;

  @CreateDateColumn()
  created_at: Date;
}
