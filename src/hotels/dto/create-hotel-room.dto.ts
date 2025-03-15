import { IsString, IsNotEmpty } from 'class-validator';

export class CreateHotelRoomDto {
  @IsString()
  @IsNotEmpty()
  description!: string;

  @IsString()
  @IsNotEmpty()
  hotelId!: string;
}