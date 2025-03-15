import { 
  Injectable, 
  NotFoundException, 
  BadRequestException 
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Reservation } from './schemas/reservation.schema';
import { HotelRoom } from '../hotels/schemas/hotel-room.schema';
import { CreateReservationDto } from './dto/create-reservation.dto';

@Injectable()
export class ReservationService {
  constructor(
    @InjectModel(Reservation.name) 
    private reservationModel: Model<Reservation>,
    @InjectModel(HotelRoom.name) 
    private hotelRoomModel: Model<HotelRoom>,
  ) {}

  async addReservation(
    userId: string,
    dto: CreateReservationDto,
  ) {
    const room = await this.hotelRoomModel.findById(dto.hotelRoom);
    if (!room?.isEnabled) {
      throw new BadRequestException('Room is not available');
    }

    const isAvailable = await this.isRoomAvailable(
      dto.hotelRoom,
      dto.startDate,
      dto.endDate,
    );
    
    if (!isAvailable) {
      throw new BadRequestException('Room is already booked');
    }

    const reservation = new this.reservationModel({
      userId,
      hotelRoom: dto.hotelRoom,
      startDate: dto.startDate,
      endDate: dto.endDate,
    });

    return reservation.save();
  }

  async getReservations(userId: string) {
    return this.reservationModel
      .find({ userId })
      .populate({
        path: 'hotelRoom',
        populate: { path: 'hotel' },
      })
      .exec();
  }

  async removeReservation(userId: string, id: string) {
    const reservation = await this.reservationModel.findById(id);
    
    if (!reservation) {
      throw new NotFoundException('Reservation not found');
    }

    if (reservation.userId.toString() !== userId) {
      throw new BadRequestException('Cannot delete others reservations');
    }

    return this.reservationModel.findByIdAndDelete(id).exec();
  }

  private async isRoomAvailable(
    roomId: string,
    startDate: Date,
    endDate: Date,
  ) {
    const overlapping = await this.reservationModel
      .find({
        hotelRoom: roomId,
        $or: [
          { startDate: { $lt: endDate }, endDate: { $gt: startDate } },
        ],
      })
      .exec();

    return overlapping.length === 0;
  }
}