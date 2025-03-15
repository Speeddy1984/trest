import {
  Controller,
  Post,
  Get,
  Delete,
  Param,
  Body,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../users/enums/user-role.enum';
import { Request } from 'express';
import { Express } from 'express-serve-static-core';

@Controller()
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  // Бронирование номера клиентом (POST /api/client/reservations)
  @Post('api/client/reservations')
  @UseGuards(RolesGuard)
  @Roles(UserRole.Client)
  async create(
    @Req() req: Request,
    @Body() dto: CreateReservationDto,
  ) {
    const userId = req.user['_id'];
    const reservation = await this.reservationService.addReservation(userId, dto);

    // Форматирование ответа
    return {
      startDate: reservation.startDate.toISOString(),
      endDate: reservation.endDate.toISOString(),
      hotelRoom: {
        description: reservation.hotelRoom.description,
        images: reservation.hotelRoom.images,
      },
      hotel: {
        title: reservation.hotelRoom.hotel.title,
        description: reservation.hotelRoom.hotel.description,
      },
    };
  }

  // Список броней текущего пользователя (GET /api/client/reservations)
  @Get('api/client/reservations')
  @UseGuards(RolesGuard)
  @Roles(UserRole.Client)
  async getUserReservations(@Req() req: Request) {
    const userId = req.user['_id'];
    const reservations = await this.reservationService.getReservations(userId);

    // Форматирование ответа
    return reservations.map((reservation) => ({
      startDate: reservation.startDate.toISOString(),
      endDate: reservation.endDate.toISOString(),
      hotelRoom: {
        description: reservation.hotelRoom.description,
        images: reservation.hotelRoom.images,
      },
      hotel: {
        title: reservation.hotelRoom.hotel.title,
        description: reservation.hotelRoom.hotel.description,
      },
    }));
  }

  // Список броней конкретного пользователя (GET /api/manager/reservations/:userId)
  @Get('api/manager/reservations/:userId')
  @UseGuards(RolesGuard)
  @Roles(UserRole.Manager)
  async getReservationsByUser(@Param('userId') userId: string) {
    const reservations = await this.reservationService.getReservations(userId);

    // Форматирование ответа
    return reservations.map((reservation) => ({
      startDate: reservation.startDate.toISOString(),
      endDate: reservation.endDate.toISOString(),
      hotelRoom: {
        description: reservation.hotelRoom.description,
        images: reservation.hotelRoom.images,
      },
      hotel: {
        title: reservation.hotelRoom.hotel.title,
        description: reservation.hotelRoom.hotel.description,
      },
    }));
  }
}