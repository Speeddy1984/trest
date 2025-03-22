import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSupportRequestDto {
  @IsNotEmpty()
  @IsString()
  user!: string; // ID пользователя (брать из сессии)

  @IsNotEmpty()
  @IsString()
  text!: string;
}
