import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateMovieDto, ParamIdDto, UpdateMovieDto } from './movies.dto';
import { MoviesService } from './movies.service';
import { ResponseObject } from '../abstract/response.object';
import { PaginationDto } from '../abstract/pagination.dto';
import { Movie } from './movies.shema';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Controller('movies')
export class MoviesController {
  constructor(private moviesService: MoviesService) {}

  @Get('')
  async getMovies(
    @Query() pagination: PaginationDto,
  ): Promise<ResponseObject<Movie[]>> {
    const data = await this.moviesService.find(
      {},
      { skip: pagination.skip, limit: pagination.limit },
    );
    return new ResponseObject(
      'FOUND_' + this.moviesService.getModelName(),
      data,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post('')
  async createMovie(
    @Body() movie: CreateMovieDto,
  ): Promise<ResponseObject<Movie>> {
    const data = await this.moviesService.createMovie(movie);
    return new ResponseObject(
      'CREATED_' + this.moviesService.getModelName(),
      data,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async updateMovie(
    @Param() param: ParamIdDto,
    @Body() movie: UpdateMovieDto,
  ): Promise<ResponseObject<Movie>> {
    const data = await this.moviesService.findByIdAndUpdate(param.id, movie);
    return new ResponseObject(
      'UPDATED_' + this.moviesService.getModelName(),
      data,
    );
  }
}
