import { 
  Injectable, 
  BadRequestException,
  UnauthorizedException 
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async registerClient(data: RegisterDto) {
    const existingUser = await this.usersService.findByEmail(data.email);
    if (existingUser) {
      throw new BadRequestException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    return this.usersService.create({
      ...data,
      passwordHash: hashedPassword,
      role: 'client',
    });
  }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (!user || !(await bcrypt.compare(pass, user.passwordHash))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return user;
  }
}