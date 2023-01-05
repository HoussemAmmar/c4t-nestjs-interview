import {
  Body,
  Controller,
  Delete,
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
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { MoviesResponseType } from '../swagger/response-types/movies-response.type';
import { apiResponse } from '../swagger/api-response.schema';

@Controller('movies')
export class MoviesController {
  constructor(private moviesService: MoviesService) {}

  @Get('')
  @ApiOperation({
    operationId: 'Get Movies',
    summary: 'Get Movies ',
  })
  @ApiResponse(apiResponse(200, `FOUND_MOVIE`, 'array', MoviesResponseType))
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

  @Post('')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    operationId: 'Create a Movie',
    summary: 'Create a Movie ',
  })
  @ApiResponse(apiResponse(200, `CREATED_MOVIE`, 'object', MoviesResponseType))
  async createMovie(
    @Body() movie: CreateMovieDto,
  ): Promise<ResponseObject<Movie>> {
    const data = await this.moviesService.createMovie(movie);
    return new ResponseObject(
      'CREATED_' + this.moviesService.getModelName(),
      data,
    );
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    operationId: 'Update a  Movie',
    summary: 'Update a Movie ',
  })
  @ApiResponse(apiResponse(200, `UPDATED_MOVIE`, 'object', MoviesResponseType))
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

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    operationId: 'Delete a  Movie',
    summary: 'Delete a Movie ',
  })
  @ApiResponse(apiResponse(200, `DELETED_MOVIE`, 'object', MoviesResponseType))
  async deleteMovie(
    @Param() param: ParamIdDto,
  ): Promise<ResponseObject<Movie>> {
    const data = await this.moviesService.findByIdAndDelete(param.id);
    return new ResponseObject(
      'DELETED' + this.moviesService.getModelName(),
      data,
    );
  }
}
