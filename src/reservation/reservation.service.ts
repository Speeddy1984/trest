import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Reservation } from './schemas/reservation.schema';

@Injectable()
export class ReservationService {
  constructor(
    @InjectModel(Reservation.name) private reservationModel: Model<Reservation>,
  ) {}

  async createReservation(userId: string, data: any): Promise<any> {
    const newReservation = new this.reservationModel({
      ...data,
      user: userId,
    });
    await newReservation.save();
    // Если требуется populate других полей, например, hotelRoom:
    return newReservation.populate('hotelRoom');
  }

  async updateReservation(userId: string, data: any): Promise<any> {
    const { _id, ...updateData } = data;
    const updatedReservation = await this.reservationModel.findOneAndUpdate(
      { _id, user: userId },
      updateData,
      { new: true },
    ).populate('hotelRoom');
    return updatedReservation;
  }

  async getReservations(userId: string): Promise<any[]> {
    const reservations = await this.reservationModel.find({ user: userId }).populate('hotelRoom');
    return reservations;
  }
}
