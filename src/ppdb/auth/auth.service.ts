import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import BaseResponse from 'src/utils/response.utils';
import { User } from '../entity/user.entity';
import { Repository } from 'typeorm';
import { ResponseSuccess } from 'src/interface/response.interface';
import { hash, compare } from 'bcrypt';
import { LoginDto, RegisterDto } from './auth.dto';
import { JwtService } from '@nestjs/jwt';
import { REQUEST } from '@nestjs/core';

@Injectable()
export class AuthService extends BaseResponse {
  constructor(
    @InjectRepository(User) private readonly authRepository: Repository<User>,
    private jwtService: JwtService,
    @Inject(REQUEST) private req: any,
  ) {
    super();
  }
  generateJWT(payload: jwtPayload, expiresIn: string | number, token: string) {
    return this.jwtService.sign(payload, {
      secret: token,
      expiresIn: expiresIn,
    });
  }

  async refreshToken(id: any, token: string): Promise<ResponseSuccess> {
    const checkUserExists = await this.authRepository.findOne({
      where: {
        id: id,
        refresh_token: token,
      },
      select: {
        id: true,
        username: true,
        email: true,
        password: true,
      },
    });

    console.log('user', checkUserExists);
    if (checkUserExists === null) {
      throw new UnauthorizedException();
    }

    const jwtPayload: jwtPayload = {
      id: checkUserExists.id,
      username: checkUserExists.username,
      email: checkUserExists.email,
    };

    const access_token = await this.generateJWT(
      jwtPayload,
      '1d',
      process.env.ACCESS_TOKEN_SECRET!,
    );

    const refresh_token = await this.generateJWT(
      jwtPayload,
      '1d',
      process.env.REFRESH_TOKEN_SECRET!,
    );

    await this.authRepository.save({
      refresh_token: refresh_token,
      id: checkUserExists.id,
    });

    return this.success('Success', {
      ...checkUserExists,
      access_token: access_token,
      refresh_token: refresh_token,
    });
  }

  async register(payload: RegisterDto): Promise<ResponseSuccess> {
    const userExist = await this.authRepository.findOne({
      where: {
        email: payload.email,
      },
    });
    if (userExist) {
      throw new HttpException('User already exist', HttpStatus.FOUND);
    }

    payload.password = await hash(payload.password, 12);
    const user = await this.authRepository.save(payload);
    return this.success('Register Success', user);
  }

  async loginAdmin(payload: LoginDto): Promise<ResponseSuccess> {
  const checkUserExists = await this.authRepository.findOne({
    where: {
      email: payload.email === 'admin' ? 'admin' : payload.email,
    },
    select: {
      id: true,
      username: true,
      email: true,
      password: true,
      refresh_token: true,
      role: true, // pastikan ini ada
    },
  });

  if (!checkUserExists) {
    throw new HttpException(
      'User tidak ditemukan',
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }

  // ✅ Cek role admin
  if (checkUserExists.role !== 'admin') {
    throw new HttpException(
      'Hanya admin yang bisa login',
      HttpStatus.FORBIDDEN,
    );
  }

  const checkPassword = await compare(
    payload.password,
    checkUserExists.password,
  );

  if (!checkPassword) {
    throw new HttpException(
      'Email dan password tidak sesuai',
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }

  const jwtPayload: jwtPayload = {
    id: checkUserExists.id,
    username: checkUserExists.username,
    email: checkUserExists.email,
  };

  const access_token = await this.generateJWT(
    jwtPayload,
    '1d',
    process.env.ACCESS_TOKEN_SECRET!,
  );

  const refresh_token = await this.generateJWT(
    jwtPayload,
    '1d',
    process.env.REFRESH_TOKEN_SECRET!,
  );

  await this.authRepository.update(
    {
      id: checkUserExists.id,
    },
    {
      refresh_token: refresh_token,
    },
  );

  return this.success('Login Success', {
    ...checkUserExists,
    access_token,
    refresh_token,
  });
}


  async login(payload: LoginDto): Promise<ResponseSuccess> {
  const checkUserExists = await this.authRepository.findOne({
    where: {
      email: payload.email === 'user' ? 'user' : payload.email,
    },
    select: {
      id: true,
      username: true,
      email: true,
      password: true,
      refresh_token: true,
      role: true, // tambahin ini
    },
  });

  if (!checkUserExists) {
    throw new HttpException(
      'User tidak ditemukan',
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }

  // ⛔ Cek role harus 'user'
  if (checkUserExists.role !== 'user') {
    throw new HttpException(
      'Hanya user yang bisa login di sini',
      HttpStatus.FORBIDDEN,
    );
  }

  const checkPassword = await compare(
    payload.password,
    checkUserExists.password,
  );

  if (!checkPassword) {
    throw new HttpException(
      'Email dan password tidak sesuai',
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }

  const jwtPayload: jwtPayload = {
    id: checkUserExists.id,
    username: checkUserExists.username,
    email: checkUserExists.email,
  };

  const access_token = await this.generateJWT(
    jwtPayload,
    '1d',
    process.env.ACCESS_TOKEN_SECRET!,
  );

  const refresh_token = await this.generateJWT(
    jwtPayload,
    '1d',
    process.env.REFRESH_TOKEN_SECRET!,
  );

  await this.authRepository.update(
    {
      id: checkUserExists.id,
    },
    {
      refresh_token: refresh_token,
    },
  );

  return this.success('Login Success', {
    ...checkUserExists,
    access_token,
    refresh_token,
  });
}


  async profile(): Promise<ResponseSuccess> {
    const checkUserExists = await this.authRepository.findOne({
      where: {
        id: this.req.user.id,
      },
      select: {
        id: true,
        username: true,
        email: true,
        // password: true,
      },
    });

    if (!checkUserExists) {
      throw new HttpException('User tidak ditemukan', HttpStatus.NOT_FOUND);
    }
    return this.success('Profile', checkUserExists);
  }
  
}
