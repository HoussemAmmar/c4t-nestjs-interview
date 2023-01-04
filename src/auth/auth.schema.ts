import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes, Types } from 'mongoose';
import { AbstractModel } from '../abstract/abstract.model';

@Schema({
  timestamps: true,
  autoIndex: true,
  autoCreate: true,
})
export class Auth extends AbstractModel {
  @Prop({
    required: true,
  })
  email: string;

  @Prop({ type: SchemaTypes.String, required: true })
  password: string;

}

const AuthSchema = SchemaFactory.createForClass(Auth);
AuthSchema.index(
  { email: 1 },
  { unique: true, collation: { locale: 'en', strength: 2 } },
);
export { AuthSchema };