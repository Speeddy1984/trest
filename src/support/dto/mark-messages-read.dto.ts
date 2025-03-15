import { IsDate, IsMongoId, IsNotEmpty } from 'class-validator';

export class MarkMessagesAsReadDto {
  @IsMongoId()
  @IsNotEmpty()
  user!: string;

  @IsMongoId()
  @IsNotEmpty()
  supportRequest!: string;

  @IsDate()
  @IsNotEmpty()
  createdBefore!: Date;
}