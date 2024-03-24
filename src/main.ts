import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { readFile } from 'fs/promises';
import * as yaml from 'yaml';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const file = await readFile(join(__dirname, '..', 'doc/api.yaml'), 'utf8');
  const swaggerDocument = yaml.parse(file);
  SwaggerModule.setup('doc', app, swaggerDocument);

  app.useGlobalPipes(new ValidationPipe({ stopAtFirstError: true }));

  const PORT = configService.get('PORT', 4000);
  await app.listen(PORT);
  console.log(`Server started on port ${PORT}`);
}
bootstrap();
