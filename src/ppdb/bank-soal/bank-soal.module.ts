import { Module } from '@nestjs/common';
import { BankSoalController } from './bank-soal.controller';
import { BankSoalService } from './bank-soal.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BankSoal } from '../entity/bank-soal.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([BankSoal])
  ],
  controllers: [BankSoalController],
  providers: [BankSoalService]
})
export class BankSoalModule {}
