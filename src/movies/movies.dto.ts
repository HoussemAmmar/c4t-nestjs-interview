import {
  IsArray,
  IsDateString,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';
import {
  DescriptionMaxLength,
  Rating,
  TitleMaxLength,
} from '../config/movies.config';
import { GenreEnum } from '../types/movies.types';
import { Types } from 'mongoose';

export class CreateMovieDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(TitleMaxLength)
  title: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(DescriptionMaxLength)
  description: string;

  @IsNotEmpty()
  @IsDateString()
  releaseDate: Date;

  @IsNotEmpty()
  @IsNumber()
  @Max(Rating.max)
  @Min(Rating.min)
  rating: number;

  @IsNotEmpty()
  @IsEnum(GenreEnum)
  genre: GenreEnum;

  @IsArray()
  @IsString({ each: true })
  actorsName: string[];

  @IsNotEmpty()
  @IsString()
  poster: string;
}

export class UpdateMovieDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MaxLength(TitleMaxLength)
  title: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MaxLength(DescriptionMaxLength)
  description: string;

  @IsOptional()
  @IsNotEmpty()
  @IsDateString()
  releaseDate: Date;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  @Max(Rating.max)
  @Min(Rating.min)
  rating: number;

  @IsOptional()
  @IsNotEmpty()
  @IsEnum(GenreEnum)
  genre: GenreEnum;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  actorsName: string[];

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  poster: string;
}

export class ParamIdDto {
  @IsMongoId()
  @IsNotEmpty()
  id: Types.ObjectId;
}
