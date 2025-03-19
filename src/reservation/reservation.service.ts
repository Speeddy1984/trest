import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Reservation, ReservationDocument } from './schemas/reservation.schema';
import { Model, Types } from 'mongoose';

interface ReservationDto {
  userId: string;
  hotelId: string;
  roomId: string;
  dateStart: Date;
  dateEnd: Date;
}

interface ReservationSearchOptions {
  userId: string;
  // Здесь можно добавить дополнительные критерии по дате
}

@Injectable()
export class ReservationService {
  constructor(@InjectModel(Reservation.name) private reservationModel: Model<ReservationDocument>) {}

  // Проверка доступности номера для бронирования (здесь можно реализовать проверку пересечения дат)
  async addReservation(data: ReservationDto): Promise<Reservation> {
    // В реальном проекте здесь добавить логику проверки занятости номера
    const newReservation = new this.reservationModel({
      userId: new Types.ObjectId(data.userId),
      hotelId: new Types.ObjectId(data.hotelId),
      roomId: new Types.ObjectId(data.roomId),
      dateStart: data.dateStart,
      dateEnd: data.dateEnd,
    });
    return newReservation.save();
  }

  async removeReservation(id: string): Promise<void> {
    const result = await this.reservationModel.findByIdAndDelete(id);
    if (!result) {
      throw new BadRequestException('Бронь с указанным ID не существует');
    }
  }

  async getReservations(filter: ReservationSearchOptions): Promise<Reservation[]> {
    return this.reservationModel.find({ userId: filter.userId });
  }
}
