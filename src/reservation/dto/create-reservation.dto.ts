import { IsNotEmpty, IsString, IsDateString } from 'class-validator';

export class CreateReservationDto {
  @IsNotEmpty()
  @IsString()
  hotelRoom!: string;  // id номера

  @IsNotEmpty()
  @IsString()
  hotelId!: string;

  @IsNotEmpty()
  @IsDateString()
  startDate!: string;

  @IsNotEmpty()
  @IsDateString()
  endDate!: string;
}
