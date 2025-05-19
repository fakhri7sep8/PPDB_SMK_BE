import { IsString, IsNotEmpty, IsIn, IsEmail } from 'class-validator';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsIn(['admin', 'siswa']) // custom roles sesuai kebutuhan
  role: string;
}

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  email: string; // bisa username atau email

  @IsString()
  @IsNotEmpty()
  password: string;
}

