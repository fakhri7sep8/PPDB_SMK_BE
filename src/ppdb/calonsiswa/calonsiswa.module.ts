import { Module } from '@nestjs/common';
import { CalonsiswaController } from './calonsiswa.controller';
import { CalonsiswaService } from './calonsiswa.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { JwtAccessTokenStrategy } from '../auth/jwtAccessToken.strategy';
import { JwtRefreshTokenStrategy } from '../auth/jwtRefreshToken.strategy';
import { CalonSiswa } from '../entity/calon-siswa.entity';
import { User } from '../entity/user.entity';

@Module({
  imports : [
    TypeOrmModule.forFeature([CalonSiswa, User]),
    JwtModule.register({})
  ],
  controllers: [CalonsiswaController],
  providers: [CalonsiswaService, JwtAccessTokenStrategy, JwtRefreshTokenStrategy]
})
export class CalonsiswaModule {}
