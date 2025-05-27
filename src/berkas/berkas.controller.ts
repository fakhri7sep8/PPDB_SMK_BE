import {
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
  Body,
  BadRequestException,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { BerkasService } from './berkas.service';
import { Berkas } from 'src/ppdb/entity/berkas.entity';

@Controller('berkas')
export class BerkasController {
  constructor(private readonly berkasService: BerkasService) {}

  @Post('upload-multi')
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const filename = `berkas-${uniqueSuffix}${ext}`;
          cb(null, filename);
        },
      }),
    }),
  )
  async uploadMultipleFiles(
    @UploadedFiles() files: Express.Multer.File[],
    @Body('calonSiswaId') calonSiswaId: string,
    @Body('jenisBerkas') jenisBerkas: string,
  ) {
    let jenisBerkasArray: string[];
    try {
      jenisBerkasArray = JSON.parse(jenisBerkas);
    } catch (e) {
      throw new BadRequestException('jenisBerkas must be a JSON array');
    }

    if (!Array.isArray(jenisBerkasArray)) {
      throw new BadRequestException('jenisBerkas must be an array');
    }

    if (files.length !== jenisBerkasArray.length) {
      throw new BadRequestException('Jumlah file dan jenisBerkas harus sama');
    }

    const results: Berkas[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const jenis = jenisBerkasArray[i];
      const filePath = `uploads/${file.filename}`;

      const saved = await this.berkasService.simpanBerkasKeDB({
        calonSiswaId: parseInt(calonSiswaId),
        jenisBerkas: jenis,
        filePath,
        status: 'Menunggu Verifikasi',
      });

      results.push(saved);
    }

    return {
      message: 'All files uploaded and saved',
      data: results,
    };
  }
}
