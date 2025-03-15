import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateHotelRoomDto {
  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  hotelId?: string;

  @IsOptional()
  isEnabled?: boolean;
}