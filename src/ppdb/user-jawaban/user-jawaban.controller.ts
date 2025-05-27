import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { UserJawabanService } from './user-jawaban.service';
import { CreateUserJawabanDto } from './user-jawaban.dto';

@Controller('user-jawaban')
export class UserJawabanController {
  constructor(private readonly ujService: UserJawabanService) {}

  @Post()
  submit(@Body() dto: CreateUserJawabanDto) {
    return this.ujService.submitJawaban(dto);
  }

  @Get(':id_user')
  findByUser(@Param('id_user') id_user: number) {
    return this.ujService.findByUser(id_user);
  }
}
