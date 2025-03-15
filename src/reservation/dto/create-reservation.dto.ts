import { IsDateString, IsMongoId } from 'class-validator';

export class CreateReservationDto {
  @IsMongoId()
  hotelRoom!: string;

  @IsDateString()
  startDate!: Date;

  @IsDateString()
  endDate!: Date;
}