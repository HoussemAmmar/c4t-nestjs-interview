import { AbstractModel } from '../abstract/abstract.model';
import { Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class Movie extends AbstractModel {}

const MovieSchema = SchemaFactory.createForClass(Movie);

export { MovieSchema };
