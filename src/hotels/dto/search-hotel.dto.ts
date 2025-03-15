import { IsOptional, IsString } from 'class-validator';

export class SearchHotelDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsOptional()
  limit?: number;

  @IsOptional()
  offset?: number;
}