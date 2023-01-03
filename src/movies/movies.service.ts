import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { AbstractService } from '../abstract/abstract.service';
import { Movie } from './movies.shema';
import { InjectModel } from '@nestjs/mongoose';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Injectable()
export class MoviesService extends AbstractService<Movie> {
  constructor(
    @InjectModel(Movie.name) private userModel: Model<Movie>,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {
    super(userModel, logger);
  }

  protected modelName = Movie.name;
}
