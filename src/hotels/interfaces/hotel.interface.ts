import { Document } from 'mongoose';

export interface Hotel extends Document {
  title: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface HotelRoom extends Document {
  hotel: string;
  description?: string;
  images: string[];
  createdAt: Date;
  updatedAt: Date;
  isEnabled: boolean;
}

export interface SearchHotelParams {
  limit: number;
  offset: number;
  title: string;
}

export interface UpdateHotelParams {
  title: string;
  description: string;
}

export interface IHotelService {
  create(data: any): Promise<Hotel>;
  findById(id: string): Promise<Hotel>;
  search(params: SearchHotelParams): Promise<Hotel[]>;
  update(id: string, data: UpdateHotelParams): Promise<Hotel>;
}

export interface SearchRoomsParams {
  limit: number;
  offset: number;
  hotel: string;
  isEnabled?: boolean;
}

export interface IHotelRoomService {
  create(data: Partial<HotelRoom>): Promise<HotelRoom>;
  findById(id: string): Promise<HotelRoom>;
  search(params: SearchRoomsParams): Promise<HotelRoom[]>;
  update(id: string, data: Partial<HotelRoom>): Promise<HotelRoom>;
}