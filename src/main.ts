import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.use('/uploads', require('express').static(join(__dirname, '..', 'uploads')));
  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
