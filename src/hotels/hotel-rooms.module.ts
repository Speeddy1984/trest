import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HotelRoomsService } from './hotel-rooms.service';
import { HotelRoom, HotelRoomSchema } from './schemas/hotel-room.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: HotelRoom.name, schema: HotelRoomSchema }]),
  ],
  providers: [HotelRoomsService],
  exports: [HotelRoomsService],
})
export class HotelRoomModule {}
