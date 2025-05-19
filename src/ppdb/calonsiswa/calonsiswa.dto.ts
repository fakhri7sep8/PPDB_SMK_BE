import { IsString, IsNotEmpty, IsEmail, Length } from 'class-validator';

export class CreateCalonSiswaDto {
  @IsNotEmpty()
  user_id: number;

  @IsString()
  @IsNotEmpty()
  nama_lengkap: string;

  @IsString()
  @Length(16, 16, { message: 'NIK harus 16 digit' })
  nik: string;

  @IsString()
  @Length(10, 10, { message: 'NISN harus 10 digit' })
  nisn: string;

  @IsString()
  @IsNotEmpty()
  jenis_kelamin: string;

  @IsString()
  @IsNotEmpty()
  tempat_lahir: string;

  @IsString()
  @IsNotEmpty()
  tanggal_lahir: string;

  @IsString()
  @IsNotEmpty()
  alamat: string;

  @IsString()
  @IsNotEmpty()
  asal_sekolah: string;

  @IsString()
  @IsNotEmpty()
  no_hp: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  tahun_ajaran: string;
}
