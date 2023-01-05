import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Enable winston logger for nest js
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));

  // Enables validation pipes on all routes
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  // Enable swagger
  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Lovester - Auth MS ')
    .setDescription('Lovester - Auth MS API description')
    .setVersion('0.0.1')
    .build();
  const document = SwaggerModule.createDocument(app, config, {
    deepScanRoutes: true,
  });
  SwaggerModule.setup('', app, document, {
    swaggerUrl: 'json',
  });
  await app.listen(process.env.DEFAULT_PORT || 3000, '0.0.0.0');
}

bootstrap();
