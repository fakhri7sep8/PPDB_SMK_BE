import { Type } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsArray,
  ValidateNested,
} from 'class-validator';

class PilihanDto {
  @IsString()
  @IsNotEmpty()
  kode: string; // misal: "A"

  @IsString()
  @IsNotEmpty()
  isi: string; // misal: "4"
}

export class CreateBankSoalDto {
  @IsString()
  @IsNotEmpty()
  pertanyaan: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PilihanDto)
  pilihan: PilihanDto[];

  @IsString()
  @IsNotEmpty()
  jawaban_benar: string; // isi jawaban yang benar, bukan "A"/"B"

  @IsString()
  pembahasan?: string;

  @IsString()
  kategori?: string;

  @IsString()
  tingkat?: string;
}
