import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class SendMessageDto {
  @IsMongoId()
  @IsNotEmpty()
  author!: string;

  @IsMongoId()
  @IsNotEmpty()
  supportRequest!: string;

  @IsString()
  @IsNotEmpty()
  text!: string;
}