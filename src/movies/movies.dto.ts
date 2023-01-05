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
import { ApiProperty } from '@nestjs/swagger';

export class CreateMovieDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(TitleMaxLength)
  @ApiProperty()
  title: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(DescriptionMaxLength)
  @ApiProperty()
  description: string;

  @IsNotEmpty()
  @IsDateString()
  @ApiProperty()
  releaseDate: Date;

  @IsNotEmpty()
  @IsNumber()
  @Max(Rating.max)
  @Min(Rating.min)
  @ApiProperty()
  rating: number;

  @IsNotEmpty()
  @IsEnum(GenreEnum)
  @ApiProperty()
  genre: GenreEnum;

  @IsArray()
  @IsString({ each: true })
  @ApiProperty()
  actorsName: string[];

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  poster: string;
}

export class UpdateMovieDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MaxLength(TitleMaxLength)
  @ApiProperty()
  title: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MaxLength(DescriptionMaxLength)
  @ApiProperty()
  description: string;

  @IsOptional()
  @IsNotEmpty()
  @IsDateString()
  @ApiProperty()
  releaseDate: Date;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  @Max(Rating.max)
  @Min(Rating.min)
  @ApiProperty()
  rating: number;

  @IsOptional()
  @IsNotEmpty()
  @IsEnum(GenreEnum)
  @ApiProperty()
  genre: GenreEnum;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @ApiProperty()
  actorsName: string[];

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  poster: string;
}

export class ParamIdDto {
  @IsMongoId()
  @IsNotEmpty()
  @ApiProperty()
  id: Types.ObjectId;
}
