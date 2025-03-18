import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { UsersModule } from './users/users.module';
import { HotelsModule } from './hotels/hotels.module';
import { ReservationModule } from './reservation/reservation.module';
import { SupportModule } from './support/support.module';
import { AuthModule } from './auth/auth.module'; // Импортируем модуль аутентификации

@Module({
  imports: [
    EventEmitterModule.forRoot(), // Подключаем EventEmitter
    MongooseModule.forRoot('mongodb+srv://speeddy1984:8dZnh1d9xCOJvgUg@diploma-cluster.1elyi.mongodb.net/?retryWrites=true&w=majority&appName=diploma-cluster'),
    UsersModule,    // Модуль пользователей
    HotelsModule,   // Модуль гостиниц
    ReservationModule, // Модуль бронирования
    SupportModule,  // Модуль чата поддержки
    AuthModule,     // Модуль аутентификации
  ],
})
export class AppModule {}
