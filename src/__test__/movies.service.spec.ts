import { CreateMovieDto, UpdateMovieDto } from '../movies/movies.dto';
import { MoviesService } from '../movies/movies.service';
import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { validateEnv } from '../env.validation';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { JwtModule } from '@nestjs/jwt';
import { MoviesModule } from '../movies/movies.module';
import { AuthModule } from '../auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

describe('createMovie', () => {
  let moviesService: MoviesService;
  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          validate: validateEnv,
          isGlobal: true,
        }),
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
        JwtModule.register({
          secret: process.env.JWT_ACCESS_TOKEN_SECRET,
          signOptions: {
            expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME,
          },
        }),
        MoviesModule,
        AuthModule,
      ],
    }).compile();

    moviesService = moduleRef.get<MoviesService>(MoviesService);
  });

  it('create movie should throw a BadRequestException if the release date is in the future', async () => {
    const movieDto: CreateMovieDto = {
      title: 'Barry Lyndon',
      description: 'string',
      releaseDate: '2025-01-04T16:25:02',
      rating: 4,
      genre: 'Comedy',
      actorsName: ['actor1', 'actor2'],
      poster: 'string',
    };
    await expect(moviesService.createMovie(movieDto)).rejects.toThrow(
      BadRequestException,
    );
  });

  it('create a movie should return a model in case of a valid CreateMovieDto ', async () => {
    const movieDto: CreateMovieDto = {
      title: 'Requiem for a Dream',
      description: 'string',
      releaseDate: '2015-01-04T16:25:02',
      rating: 4,
      genre: 'Drama',
      actorsName: ['actor1', 'actor2'],
      poster: 'string',
    };
    const result = await moviesService.createMovie(movieDto);
    expect(result).toBeInstanceOf(Model);
  });

  it('update a movieshould throw a BadRequestException if the release date is in the future', async () => {
    const id = new Types.ObjectId('63b56acadd9dd4d55a6b8c8f');
    const movieDto: UpdateMovieDto = {
      title: 'Requiem for a Dream',
      description: 'string',
      releaseDate: '2024-01-04T16:25:02',
      rating: 4,
      genre: 'Drama',
      actorsName: ['actor1', 'actor2'],
      poster: 'string',
    };

    await expect(moviesService.updateMovie(id, movieDto)).rejects.toThrow(
      BadRequestException,
    );
  });
  it('update a movie should throw a BadRequestException if the release date is in the future', async () => {
    const id = new Types.ObjectId('63b56acadd9dd4d55a6b8c8f');
    const movieDto: UpdateMovieDto = {
      title: 'Requiem for a Dream',
      description: 'string',
      releaseDate: '2001-01-04T16:25:02',
      rating: 4,
      genre: 'Drama',
      actorsName: ['actor1', 'actor2'],
      poster: 'string',
    };

    const result = await moviesService.updateMovie(id, movieDto);
    expect(result).toBeInstanceOf(Model);
  });
});
