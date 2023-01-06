import { Test, TestingModule } from '@nestjs/testing';
import { ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { JwtAuthGuard } from '../src/guards/jwt-auth.guard';
import * as winston from 'winston';
import { WINSTON_MODULE_NEST_PROVIDER, WinstonModule } from 'nest-winston';
import { validateEnv } from '../src/env.validation';
import { MoviesModule } from '../src/movies/movies.module';
import { AuthModule } from '../src/auth/auth.module';
import { MoviesService } from '../src/movies/movies.service';
import { rootMongooseTestModule } from './utils/mongooseTestModule';

export class BeforeAll {
  public moviesService: MoviesService;
  public mongod;
  public app: any;

  async close() {
    await this.mongod.stop();
    await this.app.close();
  }

  async createApp() {
    this.mongod = await MongoMemoryServer.create();
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({ validate: validateEnv, isGlobal: true }),
        rootMongooseTestModule({ uri: this.mongod.getUri() }),
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
        AuthModule,
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: () => true })
      .compile();
    //   .overrideProvider(getDbUri())
    //   .useValue(uri)
    //   .compile();

    this.moviesService = moduleRef.get<MoviesService>(MoviesService);

    this.app = moduleRef.createNestApplication();
    this.app.useLogger(this.app.get(WINSTON_MODULE_NEST_PROVIDER));
    this.app.useGlobalPipes(
      new ValidationPipe({ whitelist: true, transform: true }),
    );
    await this.app.init();
    return this.app;
  }
}
