import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Hotel, HotelDocument } from './schemas/hotel.schema';
import { HotelRoom, HotelRoomDocument } from './schemas/hotel-room.schema';
import { Model, Types } from 'mongoose';
import { SearchHotelParams, UpdateHotelParams, IHotelService } from './interfaces/hotel-service.interface';
import { SearchRoomsParams, IHotelRoomService } from './interfaces/hotel-room-service.interface';

@Injectable()
export class HotelsService implements IHotelService, IHotelRoomService {
  constructor(
    @InjectModel(Hotel.name) private hotelModel: Model<HotelDocument>,
    @InjectModel(HotelRoom.name) private hotelRoomModel: Model<HotelRoomDocument>,
  ) {}

  // Методы для гостиниц
  async createHotel(data: { title: string; description?: string }): Promise<HotelDocument> {
    const newHotel = new this.hotelModel(data);
    return newHotel.save();
  }

  async findHotelById(id: string): Promise<HotelDocument> {
    const hotel = await this.hotelModel.findById(id);
    if (!hotel) {
      throw new Error('Hotel not found');
    }
    return hotel;
  }

  async searchHotels(params: SearchHotelParams): Promise<HotelDocument[]> {
    const filter: any = {};
    if (params.title) {
      filter.title = { $regex: params.title, $options: 'i' };
    }
    return this.hotelModel.find(filter).limit(params.limit).skip(params.offset);
  }

  async updateHotel(id: string, data: UpdateHotelParams): Promise<HotelDocument> {
    const hotel = await this.hotelModel.findByIdAndUpdate(id, data, { new: true });
    if (!hotel) {
      throw new Error('Hotel not found');
    }
    return hotel;
  }

  // Методы для номеров гостиниц
  async createHotelRoom(data: Partial<HotelRoom>): Promise<HotelRoomDocument> {
    const newRoom = new this.hotelRoomModel(data);
    const savedRoom = await newRoom.save();
    // Популяция поля hotel
    await savedRoom.populate('hotel');
    return savedRoom;
  }

  async findHotelRoomById(id: string): Promise<HotelRoomDocument> {
    const room = await this.hotelRoomModel.findById(id).populate('hotel');
    if (!room) {
      throw new Error('Hotel room not found');
    }
    return room;
  }

  async searchHotelRooms(params: SearchRoomsParams): Promise<HotelRoomDocument[]> {
    const filter: any = {};
    if (params.hotel) {
      filter.hotel = params.hotel;
    }
    if (typeof params.isEnabled === 'boolean') {
      filter.isEnabled = params.isEnabled;
    }
    return this.hotelRoomModel
      .find(filter)
      .limit(params.limit)
      .skip(params.offset)
      .populate('hotel');
  }
  

  async updateHotelRoom(id: string, data: Partial<HotelRoom>): Promise<HotelRoomDocument> {
    const room = await this.hotelRoomModel.findByIdAndUpdate(id, data, { new: true }).populate('hotel');
    if (!room) {
      throw new Error('Hotel room not found');
    }
    return room;
  }
}
