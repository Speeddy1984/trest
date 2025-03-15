import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HotelRoom } from './schemas/hotel-room.schema';
import { SearchRoomsParams } from './interfaces/search-rooms-params.interface';
import { CreateHotelRoomDto } from './dto/create-hotel-room.dto';
import { UpdateHotelRoomDto } from './dto/update-hotel-room.dto';

@Injectable()
export class HotelRoomsService {
  constructor(
    @InjectModel(HotelRoom.name)
    private hotelRoomModel: Model<HotelRoom>,
  ) {}

  async search(params: SearchRoomsParams) {
    const { limit, offset, hotel, isEnabled } = params;
    const query: any = {};

    if (hotel) query.hotel = hotel;
    if (isEnabled !== undefined) query.isEnabled = isEnabled;

    const rooms = await this.hotelRoomModel
      .find(query)
      .skip(offset || 0)
      .limit(limit || 10)
      .populate('hotel', 'id title description')
      .exec();

    return rooms.map((room) => ({
      id: room._id,
      description: room.description,
      images: room.images,
      hotel: {
        id: room.hotel._id,
        title: room.hotel.title,
      },
    }));
  }

  async findById(id: string) {
    const room = await this.hotelRoomModel
      .findById(id)
      .populate('hotel', 'id title description')
      .exec();

    if (!room) {
      throw new NotFoundException('Room not found');
    }

    return {
      id: room._id,
      description: room.description,
      images: room.images,
      hotel: {
        id: room.hotel._id,
        title: room.hotel.title,
        description: room.hotel.description,
      },
    };
  }

  async create(data: CreateHotelRoomDto & { images: string[] }) {
    const { hotelId, description, images } = data;
    const room = new this.hotelRoomModel({
      hotel: hotelId,
      description,
      images,
    });
    return room.save();
  }

  async update(id: string, data: UpdateHotelRoomDto & { images?: string[] }) {
    const room = await this.hotelRoomModel
      .findByIdAndUpdate(id, data, { new: true })
      .exec();

    if (!room) {
      throw new NotFoundException('Room not found');
    }

    return room;
  }
}