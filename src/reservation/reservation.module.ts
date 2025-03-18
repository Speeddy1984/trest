import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';
import { Reservation, ReservationSchema } from './schemas/reservation.schema';
import { HotelRoomModule } from '../hotels/hotel-rooms.module';

@Module({
  imports: [
    HotelRoomModule,
    MongooseModule.forFeature([{ name: Reservation.name, schema: ReservationSchema }]),
  ],
  controllers: [ReservationController],
  providers: [ReservationService],
})
export class ReservationModule {}
