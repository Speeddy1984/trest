import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HotelRoom } from './schemas/hotel-room.schema';

@Injectable()
export class HotelRoomsService {
  constructor(
    @InjectModel(HotelRoom.name) private hotelRoomModel: Model<HotelRoom>,
  ) {}

  async getRooms(): Promise<any[]> {
    const rooms = await this.hotelRoomModel.find().populate('hotel');
    return rooms.map(room => ({
      _id: room._id,
      title: (room.hotel as any)?.title,
      description: (room.hotel as any)?.description,
      // добавьте другие необходимые поля по заданию
    }));
  }

  async getRoomDetails(id: string): Promise<any> {
    const room = await this.hotelRoomModel.findById(id).populate('hotel');
    if (!room) return null;
    return {
      _id: room._id,
      title: (room.hotel as any)?.title,
      description: (room.hotel as any)?.description,
      // добавьте другие необходимые поля по заданию
    };
  }

  async search(query: any): Promise<any[]> {
    const rooms = await this.hotelRoomModel.find(query).populate('hotel');
    return rooms.map(room => ({
      _id: room._id,
      title: (room.hotel as any)?.title,
      description: (room.hotel as any)?.description,
      // добавьте другие необходимые поля по заданию
    }));
  }

  async findById(id: string): Promise<any> {
    return this.getRoomDetails(id);
  }

  async create(data: any): Promise<any> {
    const newRoom = new this.hotelRoomModel(data);
    await newRoom.save();
    return newRoom;
  }

  async update(id: string, data: any): Promise<any> {
    const room = await this.hotelRoomModel
      .findByIdAndUpdate(id, data, { new: true })
      .populate('hotel');
    return room;
  }
}
