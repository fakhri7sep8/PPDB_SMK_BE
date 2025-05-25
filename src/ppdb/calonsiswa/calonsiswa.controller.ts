import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CalonsiswaService } from './calonsiswa.service';
import { CreateCalonSiswaDto } from './calonsiswa.dto';
import { JwtGuard } from '../auth/auth.guard';

@Controller('calonsiswa')
export class CalonsiswaController {
  constructor(private calonSiswa: CalonsiswaService) {}

  @Get('getAll')
  async getAllCalonSiswa() {
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

  @Get('detail/:id')
  async getDetail(@Param('id') id: number) {
    return this.calonSiswa.getDetail(+id);
  }

  @Put('update-status/:id')
  async updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status') status: string,
  ) {
    return this.calonSiswa.updateStatus(id, status);
  }
}
