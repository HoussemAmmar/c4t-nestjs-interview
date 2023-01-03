import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MoviesModule } from './movies/movies.module';
import { ConfigModule } from '@nestjs/config'; // import { validateEnv } from './env.validation';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_URL),
    WinstonModule.forRoot({
      handleExceptions: true,
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.ms(),
            winston.format.timestamp(),
            winston.format.json(),
            winston.format.align(),
            winston.format.colorize({ all: true }),
          ),
        }),
      ],
    }),
    MoviesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
