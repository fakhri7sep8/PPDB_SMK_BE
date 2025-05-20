import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { CalonsiswaService } from './calonsiswa.service';
import { CreateCalonSiswaDto } from './calonsiswa.dto';
import { JwtGuard } from '../auth/auth.guard';

@Controller('calonsiswa')
export class CalonsiswaController {
    constructor(private calonSiswa:CalonsiswaService){}

    @Get('getAll')
    async getAllCalonSiswa(){
        return this.calonSiswa.getAllCalonSiswa();
    }

 @Post('create')
  @UseGuards(JwtGuard)
  async createCalonSiswa(
    @Body() payload: CreateCalonSiswaDto,
    @Req() req: any,
  ) {
    const userId = req.user.id;
    return this.calonSiswa.createCalonSiswa(payload, userId);
  }
}
