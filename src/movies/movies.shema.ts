import { AbstractModel } from '../abstract/abstract.model';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';
import { GenreEnum } from '../types/movies.types';
import {
  DescriptionMaxLength,
  Rating,
  TitleMaxLength,
} from '../config/movies.config';

@Schema({
  timestamps: true,
})
export class Movie extends AbstractModel {
  @Prop({ required: true, type: SchemaTypes.String, maxLength: TitleMaxLength })
  title: string;

  @Prop({
    required: true,
    type: SchemaTypes.String,
    maxLength: DescriptionMaxLength,
  })
  description: string;

  @Prop({ required: true, type: SchemaTypes.Date })
  releaseDate: Date;

  @Prop({
    required: false,
    type: SchemaTypes.Number,
    min: Rating.min,
    max: Rating.max,
  })
  rating: number;

  @Prop({ required: true, enum: GenreEnum })
  genre: GenreEnum;
  @Prop({ required: true, type: [SchemaTypes.String] })
  actorsName: string[];

  @Prop({ required: true, type: SchemaTypes.String })
  poster: string;
}

const MovieSchema = SchemaFactory.createForClass(Movie);

export { MovieSchema };
