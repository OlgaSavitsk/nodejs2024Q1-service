import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  const PORT = parseInt(process.env.PORT, 10) || 5000;
  await app.listen(PORT);
  console.log(`Server started on port ${PORT}`);
}
bootstrap();
