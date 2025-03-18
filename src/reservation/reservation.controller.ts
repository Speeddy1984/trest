import { Controller, Get, Post, Req, Body } from '@nestjs/common';
import { ReservationService } from './reservation.service';

@Controller('reservations')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post()
  async createReservation(@Req() req: any, @Body() body: any) {
    const userId = req.user!['_id'];
    const reservation = await this.reservationService.createReservation(userId, body);
    return {
      _id: reservation._id,
      description: (reservation.hotelRoom as any)?.description,
      images: (reservation.hotelRoom as any)?.images,
      title: ((reservation.hotelRoom as any)?.hotel as any)?.title,
      hotelDescription: ((reservation.hotelRoom as any)?.hotel as any)?.description,
      // добавьте другие необходимые поля по заданию
    };
  }

  @Post('update')
  async updateReservation(@Req() req: any, @Body() body: any) {
    const userId = req.user!['_id'];
    const reservation = await this.reservationService.updateReservation(userId, body);
    return {
      _id: reservation._id,
      description: (reservation.hotelRoom as any)?.description,
      images: (reservation.hotelRoom as any)?.images,
      title: ((reservation.hotelRoom as any)?.hotel as any)?.title,
      hotelDescription: ((reservation.hotelRoom as any)?.hotel as any)?.description,
      // добавьте другие необходимые поля по заданию
    };
  }

  @Get()
  async getReservations(@Req() req: any) {
    const userId = req.user!['_id'];
    const reservations = await this.reservationService.getReservations(userId);
    return reservations.map((reservation: any) => ({
      _id: reservation._id,
      description: (reservation.hotelRoom as any)?.description,
      images: (reservation.hotelRoom as any)?.images,
      title: ((reservation.hotelRoom as any)?.hotel as any)?.title,
      hotelDescription: ((reservation.hotelRoom as any)?.hotel as any)?.description,
      // добавьте другие необходимые поля по заданию
    }));
  }
}
