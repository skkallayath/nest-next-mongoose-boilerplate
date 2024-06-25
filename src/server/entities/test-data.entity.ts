import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { BaseEntity } from './base';

@Schema()
export class TestData extends BaseEntity {
  _id?: Types.ObjectId;

  @Prop({ required: true })
  name: string;
}

export const TestDataSchema = SchemaFactory.createForClass(TestData);
TestDataSchema.set('timestamps', true);
