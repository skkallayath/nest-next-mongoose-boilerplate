import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseEntity } from './base';

@Schema()
export class EmailRequests extends BaseEntity {
  @Prop()
  to: string;

  @Prop()
  content: string;

  @Prop()
  subject: string;

  @Prop()
  response?: string;

  @Prop()
  failed?: boolean;

  @Prop()
  errorMessage?: string;

  @Prop({ type: Object })
  stack?: any;
}

export const EmailRequestsSchema = SchemaFactory.createForClass(EmailRequests);

EmailRequestsSchema.set('timestamps', true);
EmailRequestsSchema.index({ createdAt: 1, updatedAt: 1, to: 1, response: 1 });
