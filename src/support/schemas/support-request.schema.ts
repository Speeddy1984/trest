import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Message } from './message.schema';

@Schema({ timestamps: true })
export class SupportRequest extends Document {
  @Prop({ type: Types.ObjectId, required: true, ref: 'User' })
  user!: Types.ObjectId;

  @Prop({ default: Date.now })
  createdAt!: Date;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Message' }] })
  messages!: Types.ObjectId[]; // Используем ObjectId для ссылок

  @Prop({ default: true })
  isActive!: boolean;
}

export const SupportRequestSchema = SchemaFactory.createForClass(SupportRequest);