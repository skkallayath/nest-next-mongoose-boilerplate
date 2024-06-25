import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { BaseEntity } from './base';

@Schema()
export class User  extends BaseEntity{
  _id?: Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop()
  isActive?: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.set('timestamps', true);

