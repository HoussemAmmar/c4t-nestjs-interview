import { BadRequestException, Body, Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { AbstractService } from '../abstract/abstract.service';
import { Movie } from './movies.shema';
import { InjectModel } from '@nestjs/mongoose';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { CreateMovieDto } from './movies.dto';

@Injectable()
export class MoviesService extends AbstractService<Movie> {
  constructor(
    @InjectModel(Movie.name) private userModel: Model<Movie>,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {
    super(userModel, logger);
  }

  protected modelName = Movie.name;

  async createMovie(@Body() movie: CreateMovieDto): Promise<Movie> {
    if (new Date(movie.releaseDate) > new Date()) {
      throw new BadRequestException('Release date must be in the past');
    }
    return this.create(movie);
  }
}
