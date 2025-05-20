import { Body, Controller, Delete, Get, Post, Put, Query } from '@nestjs/common';
import { CalonsiswaService } from './calonsiswa.service';
import { CreateCalonSiswaDto } from './calonsiswa.dto';

@Controller('calonsiswa')
export class CalonsiswaController {
    constructor(private calonSiswa:CalonsiswaService){}

    @Get('getAll')
    async getAllCalonSiswa(){
        return this.calonSiswa.getAllCalonSiswa();
    }

    @Post('create')
    async createCalonSiswa(@Body() payload:CreateCalonSiswaDto){
        return this.calonSiswa.createCalonSiswa(payload);
    }

    @Delete('delete')
    async deleteCalonSiswa(@Query('id') id:number){
        return this.calonSiswa.deleteCalonSiswa(id);
    }

    @Get('count')
    async hitungCalonSiswa(){
        return this.calonSiswa.hitungCalonSiswa();
    }
}
