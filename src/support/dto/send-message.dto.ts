import { IsNotEmpty, IsString } from 'class-validator';

export class SendMessageDto {
  @IsNotEmpty()
  @IsString()
  author!: string; // ID автора сообщения

  @IsNotEmpty()
  @IsString()
  supportRequest!: string; // ID обращения

  @IsNotEmpty()
  @IsString()
  text!: string;
}
