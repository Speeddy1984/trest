import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Message extends Document {
  @Prop({ type: Types.ObjectId, required: true, ref: 'User' })
  author!: Types.ObjectId;

  @Prop({ type: Types.ObjectId, required: true, ref: 'SupportRequest' })
  supportRequest!: Types.ObjectId;

  @Prop({ default: Date.now })
  sentAt!: Date;

  @Prop({ required: true })
  text!: string;

  @Prop()
  readAt!: Date;
}

export const MessageSchema = SchemaFactory.createForClass(Message);