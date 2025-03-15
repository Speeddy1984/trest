import { Document, Types } from 'mongoose';
import { CreateReservationDto } from '../dto/create-reservation.dto';

export interface Reservation extends Document {
  userId: Types.ObjectId;
  hotelId: Types.ObjectId;
  roomId: Types.ObjectId;
  dateStart: Date;
  dateEnd: Date;
}

export interface ReservationSearchOptions {
  userId: string;
  dateStart?: Date;
  dateEnd?: Date;
}

export interface IReservationService {
  addReservation(data: CreateReservationDto): Promise<Reservation>;
  removeReservation(id: string): Promise<void>;
  getReservations(filter: ReservationSearchOptions): Promise<Reservation[]>;
}