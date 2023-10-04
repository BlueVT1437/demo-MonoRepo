/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });
  app.enableCors();
  // app.useGlobalPipes(new ValidationPipe());
  await app.startAllMicroservices();
  await app.listen(3004);
}

bootstrap();
