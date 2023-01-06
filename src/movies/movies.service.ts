import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { AbstractService } from '../abstract/abstract.service';
import { Movie } from './movies.shema';
import { InjectModel } from '@nestjs/mongoose';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { CreateMovieDto, UpdateMovieDto } from './movies.dto';

@Injectable()
export class MoviesService extends AbstractService<Movie> {
  protected modelName = Movie.name;

  constructor(
    @InjectModel(Movie.name) private userModel: Model<Movie>,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {
    super(userModel, logger);
  }

  async createMovie(movie: CreateMovieDto): Promise<Movie> {
    if (new Date(movie.releaseDate) > new Date()) {
      throw new BadRequestException('Release date must be in the past');
    }
    return this.create(movie);
  }

  async updateMovie(id: Types.ObjectId, movie: UpdateMovieDto): Promise<Movie> {
    if (new Date(movie.releaseDate) > new Date()) {
      throw new BadRequestException('Release date must be in the past');
    }
    return this.findByIdAndUpdate(id, movie);
  }
}
