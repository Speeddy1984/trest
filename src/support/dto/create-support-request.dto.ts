import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class CreateSupportRequestDto {
  @IsMongoId()
  @IsNotEmpty()
  user!: string;

  @IsString()
  @IsNotEmpty()
  text!: string;
}