import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // strips out any props in request body that don't exist in DTO
      forbidNonWhitelisted: true, // throw errors when props that don't exist in DTO are included in the request
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
