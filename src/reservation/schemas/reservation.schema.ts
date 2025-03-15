import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../../users/schemas/user.schema';
import { HotelRoom } from '../../hotels/schemas/hotel-room.schema';

@Schema({ timestamps: true })
export class Reservation extends Document {
  @Prop({ type: Types.ObjectId, ref: User.name, required: true })
  userId!: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: HotelRoom.name, required: true })
  hotelRoom!: Types.ObjectId;

  @Prop({ required: true })
  startDate!: Date;

  @Prop({ required: true })
  endDate!: Date;
}

export const ReservationSchema = SchemaFactory.createForClass(Reservation);