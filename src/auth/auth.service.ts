import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { User } from '../users/schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Неверный email или пароль');
    }
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      throw new UnauthorizedException('Неверный email или пароль');
    }
    // Исключаем поле passwordHash из возвращаемого объекта
    const { passwordHash, ...result } = user.toObject();
    return result;
  }

  async login(user: any) {
    // Здесь можно настроить JWT или просто вернуть данные,
    // т.к. Passport с сессиями сохранит пользователя в сессии.
    return {
      email: user.email,
      name: user.name,
      contactPhone: user.contactPhone,
    };
  }
}
