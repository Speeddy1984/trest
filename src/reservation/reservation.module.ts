import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReservationController } from './reservation.controller';
import { ReservationService } from './reservation.service';
import { Reservation, ReservationSchema } from './schemas/reservation.schema';
import { HotelRoomModule } from '../hotels/hotel-rooms.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Reservation.name, schema: ReservationSchema },
    ]),
    HotelRoomModule,
  ],
  controllers: [ReservationController],
  providers: [ReservationService],
})
export class ReservationModule {}