import { Controller, Post, Body, Get, Param, UseGuards } from '@nestjs/common';
import { UserJawabanService } from './user-jawaban.service';
import { CreateUserJawabanDto } from './user-jawaban.dto';
import { JwtGuard } from '../auth/auth.guard';

@Controller('user-jawaban')
export class UserJawabanController {
  constructor(private readonly ujService: UserJawabanService) {}

  @UseGuards(JwtGuard)
  @Post()
  submit(@Body() dto: CreateUserJawabanDto) {
    return this.ujService.submitJawaban(dto);
  }

  @UseGuards(JwtGuard)
  @Get()
  findByUser(@Param('id_user') id_user: number) {
    return this.ujService.findByUser(id_user);
  }
}
