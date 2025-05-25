import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { BankSoalService } from './bank-soal.service';
import { CreateBankSoalDto } from './bank-soal.dto';

@Controller('bank-soal')
export class BankSoalController {
  constructor(private bankService: BankSoalService) {}

  @Post('create')
  create(@Body() dto: CreateBankSoalDto) {
    return this.bankService.create(dto);
  }

  @Get('getAll')
  findAll() {
    return this.bankService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id:string) {
    return this.bankService.findOne(+id);
  }

  @Delete('delete/:id')
  deleteSoal(@Param('id') id:string) {
    return this.bankService.deleteSoal(+id);
  }
}
