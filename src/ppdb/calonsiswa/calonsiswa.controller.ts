import { Controller, Get, Post } from '@nestjs/common';
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
    async createCalonSiswa(payload:CreateCalonSiswaDto){
        return this.calonSiswa.createCalonSiswa(payload);
    }
}
