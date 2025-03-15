import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Hotel } from './schemas/hotel.schema';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { UpdateHotelDto } from './dto/update-hotel.dto';

@Injectable()
export class HotelsService {
  constructor(
    @InjectModel(Hotel.name)
    private hotelModel: Model<Hotel>,
  ) {}

  async create(data: CreateHotelDto) {
    const hotel = new this.hotelModel(data);
    return hotel.save();
  }

  async findAll(params: { limit: number; offset: number }) {
    const { limit, offset } = params;
    return this.hotelModel
      .find()
      .skip(offset || 0)
      .limit(limit || 10)
      .exec();
  }

  async update(id: string, data: UpdateHotelDto) {
    const hotel = await this.hotelModel
      .findByIdAndUpdate(id, data, { new: true })
      .exec();

    if (!hotel) {
      throw new NotFoundException('Hotel not found');
    }

    return hotel;
  }
}