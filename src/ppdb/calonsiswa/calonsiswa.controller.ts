import {
  Body,
  Controller, 
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Delete,
  Param,
  Query,
  Req,
  UseGuards,
  Get,
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


  @Put('update/:id')
  // @UseGuards(JwtGuard)
  async updateCalonSiswa(@Body() payload: CreateCalonSiswaDto,@Param('id') id: string) {
    return this.calonSiswa.updateCalonSiswa(+id,payload);
  }

  @Delete('delete')
  async deleteCalonSiswa(@Query('id') id: number) {
    return this.calonSiswa.deleteCalonSiswa(id);
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
