import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  Res,
  BadRequestException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { LocalGuard } from './guards/local.guard';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

// Расширяем типы Express
declare module 'express' {
  interface Request {
    user?: {
      email: string;
      name: string;
      contactPhone?: string;
      role: string;
      _id: string;
    };
    logout: (callback: (err: Error) => void) => void;
  }
}

@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalGuard)
  async login(@Req() req: Request) {
    if (!req.user) {
      throw new BadRequestException('User not found in request');
    }
    
    return {
      email: req.user.email,
      name: req.user.name,
      contactPhone: req.user.contactPhone,
    };
  }

  @Post('logout')
  async logout(@Req() req: Request, @Res() res: Response) {
    req.logout((err: Error) => {
      if (err) {
        throw new BadRequestException('Logout failed');
      }
      res.clearCookie('connect.sid');
      res.send();
    });
  }

  @Post('client/register')
  async register(@Body() data: RegisterDto) {
    const user = await this.authService.registerClient(data);
    return {
      id: user._id,
      email: user.email,
      name: user.name,
    };
  }
}