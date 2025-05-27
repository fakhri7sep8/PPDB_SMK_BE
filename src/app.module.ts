import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './ppdb/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CalonsiswaModule } from './ppdb/calonsiswa/calonsiswa.module';
import { CloudinaryModule } from './ppdb/cloudinary/cloudinary.module';
import { BerkasModule } from './ppdb/berkas/berkas.module';
import { SoalModule } from './ppdb/soal/soal.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory : async () =>{
        const {typeOrmConfig} = await import('./config/typeorm.config')
        return typeOrmConfig
      }
    }),
    AuthModule,
    CalonsiswaModule,
    CloudinaryModule,
    BerkasModule,
    SoalModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
