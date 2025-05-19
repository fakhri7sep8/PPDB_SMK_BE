import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { User } from '../entity/user.entity';
import { JwtRefreshTokenStrategy } from './jwtRefreshToken.strategy';
import { JwtAccessTokenStrategy } from './jwtAccessToken.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({}),
  ],
  providers: [AuthService, JwtAccessTokenStrategy, JwtRefreshTokenStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
