import { IsOptional, IsString } from 'class-validator';

export class SearchUserDto {
  @IsString()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  contactPhone?: string;

  @IsOptional()
  limit?: number;

  @IsOptional()
  offset?: number;
}