import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseEntity } from './base';

@Schema()
export class SMSRequests extends BaseEntity {
  @Prop()
  to: string;

  @Prop()
  message: string;

  @Prop()
  language: string;

  @Prop()
  response?: string;

  @Prop()
  failed?: boolean;

  @Prop()
  errorMessage?: string;

  @Prop({ type: Object })
  stack?: any;
}

export const SMSRequestsSchema = SchemaFactory.createForClass(SMSRequests);

SMSRequestsSchema.set('timestamps', true);
SMSRequestsSchema.index({ createdAt: 1, updatedAt: 1, to: 1, response: 1 });
