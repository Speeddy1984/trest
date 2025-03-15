// src/users/dto/create-user-admin.dto.ts
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { UserRole } from '../enums/user-role.enum';

export class CreateUserAdminDto {
  @IsEmail()
  email!: string;

  @IsNotEmpty()
  password!: string;

  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  contactPhone!: string;

  @IsString()
  @IsNotEmpty()
  role!: UserRole;
}